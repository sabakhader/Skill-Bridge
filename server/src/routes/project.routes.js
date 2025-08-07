const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { auth, checkRole } = require('../middleware/auth.middleware');
const Project = require('../models/project.model');

// Validation middleware
const projectValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('category').isIn([
    'Web Development',
    'Mobile Development',
    'UI/UX Design',
    'Digital Marketing',
    'Content Writing',
    'Business Strategy',
    'Financial Planning',
    'Legal Services',
    'Other',
  ]).withMessage('Invalid category'),
  body('skills').isArray().withMessage('Skills must be an array'),
  body('budget').isNumeric().withMessage('Budget must be a number'),
  body('duration').isNumeric().withMessage('Duration must be a number'),
];

// Get all projects with filters
router.get('/', async (req, res) => {
  try {
    const {
      category,
      minBudget,
      maxBudget,
      status,
      skills,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};
    
    if (category) query.category = category;
    if (status) query.status = status;
    if (minBudget || maxBudget) {
      query.budget = {};
      if (minBudget) query.budget.$gte = Number(minBudget);
      if (maxBudget) query.budget.$lte = Number(maxBudget);
    }
    if (skills) {
      query.skills = { $in: Array.isArray(skills) ? skills : [skills] };
    }

    const projects = await Project.find(query)
      .populate('entrepreneur', 'profile.firstName profile.lastName profile.avatar')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Project.countDocuments(query);

    res.json({
      projects,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ message: 'Error fetching projects' });
  }
});

// Get project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('entrepreneur', 'profile.firstName profile.lastName profile.avatar')
      .populate('selectedFreelancer', 'profile.firstName profile.lastName profile.avatar')
      .populate('applications.freelancer', 'profile.firstName profile.lastName profile.avatar');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ message: 'Error fetching project' });
  }
});

// Create new project
router.post('/', [auth, checkRole(['entrepreneur']), projectValidation], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const project = new Project({
      ...req.body,
      entrepreneur: req.user._id,
    });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ message: 'Error creating project' });
  }
});

// Update project
router.put('/:id', [auth, projectValidation], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user is the entrepreneur
    if (!project.entrepreneur.equals(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    Object.assign(project, req.body);
    await project.save();
    
    res.json(project);
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ message: 'Error updating project' });
  }
});

// Apply to project
router.post('/:id/apply', [auth, checkRole(['freelancer'])], async (req, res) => {
  try {
    const { coverLetter, proposedBudget } = req.body;
    
    if (!coverLetter || !proposedBudget) {
      return res.status(400).json({ message: 'Cover letter and proposed budget are required' });
    }

    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.status !== 'open') {
      return res.status(400).json({ message: 'Project is not open for applications' });
    }

    if (!project.canApply(req.user._id)) {
      return res.status(400).json({ message: 'You cannot apply to this project' });
    }

    project.applications.push({
      freelancer: req.user._id,
      coverLetter,
      proposedBudget,
    });

    await project.save();
    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Apply to project error:', error);
    res.status(500).json({ message: 'Error applying to project' });
  }
});

// Update application status
router.put('/:id/applications/:applicationId', [auth], async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (!project.entrepreneur.equals(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const application = project.applications.id(req.params.applicationId);
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.status = status;
    
    if (status === 'accepted') {
      project.selectedFreelancer = application.freelancer;
      project.status = 'in_progress';
    }

    await project.save();
    res.json({ message: 'Application status updated successfully' });
  } catch (error) {
    console.error('Update application status error:', error);
    res.status(500).json({ message: 'Error updating application status' });
  }
});

// Add milestone
router.post('/:id/milestones', [auth], async (req, res) => {
  try {
    const { title, description, dueDate, amount } = req.body;
    
    if (!title || !description || !dueDate || !amount) {
      return res.status(400).json({ message: 'All milestone fields are required' });
    }

    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (!project.entrepreneur.equals(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    project.milestones.push({
      title,
      description,
      dueDate,
      amount,
    });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.error('Add milestone error:', error);
    res.status(500).json({ message: 'Error adding milestone' });
  }
});

// Update milestone status
router.put('/:id/milestones/:milestoneId', [auth], async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['in_progress', 'completed', 'approved'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const milestone = project.milestones.id(req.params.milestoneId);
    
    if (!milestone) {
      return res.status(404).json({ message: 'Milestone not found' });
    }

    // Only freelancer can mark as completed
    if (status === 'completed' && !project.selectedFreelancer.equals(req.user._id)) {
      return res.status(403).json({ message: 'Only the assigned freelancer can complete milestones' });
    }

    // Only entrepreneur can approve
    if (status === 'approved' && !project.entrepreneur.equals(req.user._id)) {
      return res.status(403).json({ message: 'Only the entrepreneur can approve milestones' });
    }

    milestone.status = status;
    
    if (status === 'completed') {
      milestone.completedAt = Date.now();
    } else if (status === 'approved') {
      milestone.approvedAt = Date.now();
    }

    // Check if all milestones are approved
    if (status === 'approved' && 
        project.milestones.every(m => m.status === 'approved')) {
      project.status = 'completed';
    }

    await project.save();
    res.json(project);
  } catch (error) {
    console.error('Update milestone status error:', error);
    res.status(500).json({ message: 'Error updating milestone status' });
  }
});

module.exports = router; 
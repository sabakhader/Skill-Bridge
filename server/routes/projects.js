const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const Project = require('../models/Project');

// @route   GET api/projects
// @desc    Get all projects with filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, minBudget, maxBudget, status } = req.query;
    const filter = {};

    if (category) {
      filter.category = category;
    }
    if (minBudget || maxBudget) {
      filter.budget = {};
      if (minBudget) filter.budget.$gte = Number(minBudget);
      if (maxBudget) filter.budget.$lte = Number(maxBudget);
    }
    if (status) {
      filter.status = status;
    }

    const projects = await Project.find(filter)
      .populate('owner', 'firstName lastName profilePicture')
      .populate('freelancer', 'firstName lastName profilePicture')
      .sort({ createdAt: -1 });

    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST api/projects
// @desc    Create a new project
// @access  Private (Entrepreneur only)
router.post('/', protect, authorize('entrepreneur'), async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      budget,
      deadline,
      skills,
      requirements
    } = req.body;

    const project = new Project({
      owner: req.user._id,
      title,
      description,
      category,
      budget,
      deadline,
      skills,
      requirements
    });

    const savedProject = await project.save();
    await savedProject.populate('owner', 'firstName lastName profilePicture');

    res.status(201).json(savedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/projects/:id
// @desc    Get project by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('owner', 'firstName lastName profilePicture company')
      .populate('freelancer', 'firstName lastName profilePicture skills')
      .populate('proposals.freelancer', 'firstName lastName profilePicture skills');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT api/projects/:id
// @desc    Update project
// @access  Private (Project owner only)
router.put('/:id', protect, async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user is project owner
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
      .populate('owner', 'firstName lastName profilePicture')
      .populate('freelancer', 'firstName lastName profilePicture');

    res.json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE api/projects/:id
// @desc    Delete project
// @access  Private (Project owner only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user is project owner
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await project.remove();
    res.json({ message: 'Project removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST api/projects/:id/proposals
// @desc    Submit a proposal for a project
// @access  Private (Freelancer only)
router.post('/:id/proposals', protect, authorize('freelancer'), async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.status !== 'open') {
      return res.status(400).json({ message: 'Project is not open for proposals' });
    }

    // Check if freelancer already submitted a proposal
    if (project.proposals.some(p => p.freelancer.toString() === req.user._id.toString())) {
      return res.status(400).json({ message: 'Already submitted a proposal' });
    }

    const { coverLetter, proposedBudget, estimatedTime } = req.body;

    project.proposals.unshift({
      freelancer: req.user._id,
      coverLetter,
      proposedBudget,
      estimatedTime
    });

    await project.save();
    await project.populate('proposals.freelancer', 'firstName lastName profilePicture');

    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT api/projects/:id/proposals/:proposalId
// @desc    Accept/Reject a proposal
// @access  Private (Project owner only)
router.put('/:id/proposals/:proposalId', protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if user is project owner
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const proposal = project.proposals.id(req.params.proposalId);

    if (!proposal) {
      return res.status(404).json({ message: 'Proposal not found' });
    }

    const { status } = req.body;

    if (status === 'accepted') {
      // Update project status and assign freelancer
      project.status = 'in-progress';
      project.freelancer = proposal.freelancer;
      project.finalBudget = proposal.proposedBudget;
      
      // Set all other proposals to rejected
      project.proposals.forEach(p => {
        if (p._id.toString() !== req.params.proposalId) {
          p.status = 'rejected';
        }
      });
    }

    proposal.status = status;
    await project.save();
    await project.populate('proposals.freelancer', 'firstName lastName profilePicture');

    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 
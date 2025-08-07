const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const User = require('../models/User');
const Project = require('../models/Project');

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Users route is working!' });
});

// @route   GET api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      user.email = req.body.email || user.email;
      user.bio = req.body.bio || user.bio;
      user.skills = req.body.skills || user.skills;
      user.location = req.body.location || user.location;
      user.profilePicture = req.body.profilePicture || user.profilePicture;
      user.social = req.body.social || user.social;

      if (req.body.password) {
        user.password = req.body.password;
      }

      // Role specific updates
      if (user.role === 'freelancer') {
        user.hourlyRate = req.body.hourlyRate || user.hourlyRate;
        user.experience = req.body.experience || user.experience;
        user.education = req.body.education || user.education;
      } else if (user.role === 'entrepreneur') {
        user.company = req.body.company || user.company;
      } else if (user.role === 'investor') {
        user.investmentPreferences = req.body.investmentPreferences || user.investmentPreferences;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        role: updatedUser.role,
        bio: updatedUser.bio,
        skills: updatedUser.skills,
        location: updatedUser.location,
        profilePicture: updatedUser.profilePicture,
        social: updatedUser.social
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/users/freelancer-stats
// @desc    Get freelancer statistics
// @access  Private (Freelancer only)
router.get('/freelancer-stats', protect, authorize('freelancer'), async (req, res) => {
  try {
    const projects = await Project.find({ freelancer: req.user._id });
    
    const stats = {
      activeProjects: projects.filter(p => p.status === 'in-progress').length,
      completedProjects: projects.filter(p => p.status === 'completed').length,
      totalEarnings: projects
        .filter(p => p.status === 'completed')
        .reduce((total, project) => total + project.budget, 0),
      recentProjects: projects
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, 5)
        .map(p => ({
          _id: p._id,
          title: p.title,
          status: p.status,
          budget: p.budget
        }))
    };

    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/users/entrepreneur-stats
// @desc    Get entrepreneur statistics
// @access  Private (Entrepreneur only)
router.get('/entrepreneur-stats', protect, authorize('entrepreneur'), async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user._id });
    
    const stats = {
      postedProjects: projects.length,
      activeProjects: projects.filter(p => p.status === 'in-progress').length,
      totalInvestment: projects.reduce((total, project) => total + project.budget, 0),
      recentProjects: projects
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, 5)
        .map(p => ({
          _id: p._id,
          title: p.title,
          status: p.status,
          budget: p.budget,
          proposals: p.proposals.length
        }))
    };

    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/users/investor-stats
// @desc    Get investor statistics
// @access  Private (Investor only)
router.get('/investor-stats', protect, authorize('investor'), async (req, res) => {
  try {
    // Note: This is a placeholder. You'll need to create an Investment model
    // and implement the actual investment tracking logic
    const stats = {
      investmentsMade: 0,
      activeInvestments: 0,
      portfolioValue: 0,
      investments: []
    };

    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/users/freelancers
// @desc    Get all freelancers
// @access  Public
router.get('/freelancers', async (req, res) => {
  try {
    const { skills, hourlyRate } = req.query;
    const filter = { role: 'freelancer' };

    if (skills) {
      filter.skills = { $in: skills.split(',') };
    }
    if (hourlyRate) {
      filter.hourlyRate = { $lte: Number(hourlyRate) };
    }

    const freelancers = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 });

    res.json(freelancers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/users/:id
// @desc    Get user by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 
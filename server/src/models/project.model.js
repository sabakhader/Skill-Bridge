const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  entrepreneur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Web Development',
      'Mobile Development',
      'UI/UX Design',
      'Digital Marketing',
      'Content Writing',
      'Business Strategy',
      'Financial Planning',
      'Legal Services',
      'Other',
    ],
  },
  skills: [{
    type: String,
    required: true,
  }],
  budget: {
    type: Number,
    required: true,
    min: 0,
  },
  duration: {
    type: Number, // in days
    required: true,
    min: 1,
  },
  status: {
    type: String,
    enum: ['draft', 'open', 'in_progress', 'completed', 'cancelled'],
    default: 'draft',
  },
  visibility: {
    type: String,
    enum: ['public', 'private', 'invite_only'],
    default: 'public',
  },
  applications: [{
    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    coverLetter: {
      type: String,
      required: true,
    },
    proposedBudget: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  }],
  selectedFreelancer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  milestones: [{
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed', 'approved'],
      default: 'pending',
    },
    completedAt: Date,
    approvedAt: Date,
  }],
  attachments: [{
    name: String,
    url: String,
    type: String,
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  }],
  tags: [String],
  location: {
    type: String,
    required: false,
  },
  requiresNDA: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save middleware to update timestamps
projectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Method to check if a user can apply
projectSchema.methods.canApply = function(userId) {
  if (this.entrepreneur.equals(userId)) {
    return false;
  }
  return !this.applications.some(app => app.freelancer.equals(userId));
};

// Method to get project status
projectSchema.methods.getProjectProgress = function() {
  if (!this.milestones || this.milestones.length === 0) {
    return 0;
  }
  
  const completedMilestones = this.milestones.filter(
    m => m.status === 'completed' || m.status === 'approved'
  ).length;
  
  return (completedMilestones / this.milestones.length) * 100;
};

// Static method to find similar projects
projectSchema.statics.findSimilar = function(projectId, limit = 5) {
  return this.model('Project').find({
    _id: { $ne: projectId },
    status: 'open',
  })
  .limit(limit)
  .populate('entrepreneur', 'profile.firstName profile.lastName profile.avatar');
};

const Project = mongoose.model('Project', projectSchema);

module.exports = Project; 
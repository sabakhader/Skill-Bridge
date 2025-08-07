const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema(
  {
    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    coverLetter: {
      type: String,
      required: true,
      minlength: 50,
      maxlength: 1000
    },
    proposedBudget: {
      type: Number,
      required: true,
      min: 0
    },
    estimatedTime: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending'
    },
    attachments: [{
      name: String,
      url: String
    }]
  },
  { timestamps: true }
);

const milestoneSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'overdue'],
    default: 'pending'
  },
  payment: {
    type: Number,
    required: true,
    min: 0
  }
});

const projectSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 100
    },
    description: {
      type: String,
      required: true,
      minlength: 50,
      maxlength: 2000
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Web Development',
        'Mobile Development',
        'UI/UX Design',
        'Data Science',
        'Digital Marketing',
        'Content Writing'
      ]
    },
    skills: [{
      type: String,
      required: true
    }],
    budget: {
      type: Number,
      required: true,
      min: 0
    },
    finalBudget: {
      type: Number,
      min: 0
    },
    deadline: {
      type: Date,
      required: true
    },
    requirements: [{
      type: String,
      required: true
    }],
    attachments: [{
      name: String,
      url: String
    }],
    status: {
      type: String,
      enum: ['open', 'in-progress', 'completed', 'cancelled'],
      default: 'open'
    },
    proposals: [proposalSchema],
    milestones: [milestoneSchema],
    paymentVerified: {
      type: Boolean,
      default: false
    },
    rating: {
      freelancer: {
        rating: { type: Number, min: 1, max: 5 },
        review: String
      },
      client: {
        rating: { type: Number, min: 1, max: 5 },
        review: String
      }
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual for proposal count
projectSchema.virtual('proposalCount').get(function() {
  return this.proposals.length;
});

// Virtual for project completion percentage
projectSchema.virtual('completionPercentage').get(function() {
  if (!this.milestones || this.milestones.length === 0) return 0;
  
  const completedMilestones = this.milestones.filter(
    milestone => milestone.status === 'completed'
  ).length;
  
  return Math.round((completedMilestones / this.milestones.length) * 100);
});

// Index for searching
projectSchema.index({ title: 'text', description: 'text', skills: 'text' });

// Pre-save hook to update status based on deadline
projectSchema.pre('save', function(next) {
  if (this.deadline < new Date() && this.status === 'open') {
    this.status = 'cancelled';
  }
  next();
});

module.exports = mongoose.model('Project', projectSchema); 
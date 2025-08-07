const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: { 
    type: String, 
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: { 
    type: String, 
    required: [true, 'Last name is required'],
    trim: true
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  role: { 
    type: String, 
    enum: {
      values: ['freelancer', 'entrepreneur', 'investor'],
      message: '{VALUE} is not a valid role'
    },
    required: [true, 'Role is required']
  },
  bio: { 
    type: String,
    trim: true,
    maxlength: [500, 'Bio cannot be more than 500 characters']
  },
  skills: [String],
  location: { type: String },
  profilePicture: { type: String },
  social: {
    linkedin: String,
    github: String,
    twitter: String,
    website: String
  },
  hourlyRate: { 
    type: Number,
    min: [0, 'Hourly rate cannot be negative']
  },
  experience: [{ 
    title: String,
    company: String,
    years: Number,
    description: String
  }],
  education: [{
    degree: String,
    institution: String,
    year: Number
  }],
  company: {
    name: String,
    description: String,
    website: String
  },
  investmentPreferences: {
    sectors: [String],
    stagePreference: [String],
    typicalTicketSize: {
      min: Number,
      max: Number
    }
  },
  isVerified: { 
    type: Boolean, 
    default: false 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Create indexes for search optimization
userSchema.index({ firstName: 1, lastName: 1 });
userSchema.index({ role: 1 });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords for login
userSchema.methods.matchPassword = async function(enteredPassword) {
  try {
    console.log('Comparing passwords:');
    console.log('Entered password:', enteredPassword);
    console.log('Stored hashed password:', this.password);
    const isMatch = await bcrypt.compare(enteredPassword, this.password);
    console.log('Password match result:', isMatch);
    return isMatch;
  } catch (error) {
    console.error('Password comparison error:', error);
    throw error;
  }
};

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

const User = mongoose.model('User', userSchema);
module.exports = User;
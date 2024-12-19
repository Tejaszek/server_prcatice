const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'], // Restrict gender values
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

// Credentials Schema
const credentialsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

// Export both models
const User = mongoose.model('User', userSchema);
const Credentials = mongoose.model('Credentials', credentialsSchema);

module.exports = { User, Credentials };

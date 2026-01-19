const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Recipe name is required'],
    trim: true,
    maxlength: 200,
  },
  image: {
    type: String,
    default: '/images/default.jpg',
  },
  ingredients: {
    type: String,
    required: [true, 'Ingredients are required'],
    maxlength: 10000,
  },
  instructions: {
    type: String,
    required: [true, 'Instructions are required'],
    maxlength: 10000,
  },
  isDefault: {
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

// Auto-update timestamp on save
recipeSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Recipe', recipeSchema);
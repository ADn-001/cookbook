const Recipe = require('../models/Recipe');
const path = require('path');
const fs = require('fs').promises;

// Helper to get the default image path (relative to public folder)
const DEFAULT_IMAGE = '/images/default.jpg';

exports.createRecipe = async (req, res) => {
  try {
    const { name, ingredients, instructions } = req.body;
    const userId = req.session.userId;

    if (!name || !ingredients || !instructions) {
      return res.status(400).json({ message: 'Name, ingredients, and instructions are required' });
    }

    // Image handling
    let imagePath = DEFAULT_IMAGE;
    if (req.file) {
      // multer puts file in req.file
      imagePath = `/uploads/${req.file.filename}`;
    }

    const recipe = new Recipe({
      userId,
      name,
      ingredients,
      instructions,
      image: imagePath,
    });

    await recipe.save();

    res.status(201).json(recipe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating recipe' });
  }
};

exports.getAllRecipes = async (req, res) => {
  try {
    const userId = req.session.userId;

    const recipes = await Recipe.find({ userId }).sort({ createdAt: -1 });

    // If user has no recipes, the frontend will usually show the "Add new" button
    // but we still return empty array here → frontend decides to show welcome or not
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching recipes' });
  }
};

exports.getRecipeById = async (req, res) => {
  try {
    const userId = req.session.userId;
    const recipe = await Recipe.findOne({ _id: req.params.id, userId });

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found or not owned by user' });
    }

    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching recipe' });
  }
};

exports.updateRecipe = async (req, res) => {
  try {
    const userId = req.session.userId;
    const { name, ingredients, instructions } = req.body;

    const recipe = await Recipe.findOne({ _id: req.params.id, userId });

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found or not owned by user' });
    }

    // Update fields if provided
    if (name) recipe.name = name;
    if (ingredients) recipe.ingredients = ingredients;
    if (instructions) recipe.instructions = instructions;

    // Image update (optional)
    if (req.file) {
      // Optional: delete old image if not default
      if (recipe.image !== DEFAULT_IMAGE && recipe.image.startsWith('/uploads/')) {
        const oldPath = path.join(__dirname, '..', 'public', recipe.image);
        await fs.unlink(oldPath).catch(() => {}); // ignore if already deleted
      }
      recipe.image = `/uploads/${req.file.filename}`;
    }

    await recipe.save();

    res.json(recipe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating recipe' });
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    const userId = req.session.userId;
    const recipe = await Recipe.findOneAndDelete({ _id: req.params.id, userId });

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found or not owned by user' });
    }

    // Optional: clean up image file if not default
    if (recipe.image !== DEFAULT_IMAGE && recipe.image.startsWith('/uploads/')) {
      const imagePath = path.join(__dirname, '..', 'public', recipe.image);
      await fs.unlink(imagePath).catch(() => {});
    }

    res.json({ message: 'Recipe deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting recipe' });
  }
};

// Called only once during registration (from auth controller)
exports.createDefaultRecipe = async (userId) => {
  try {
    const defaultRecipe = new Recipe({
      userId,
      name: 'How to Get Started',
      ingredients: '• Your favorite ingredients go here\n• One per line is nice',
      instructions: 'Welcome to Cookbook!\n\n' +
        '1. Click "Add New Recipe" to create your first real recipe\n' +
        '2. Upload a photo (optional)\n' +
        '3. Give it a name, list ingredients, write steps\n' +
        '4. Click cards to view full recipe\n' +
        '5. Use the pen icon to edit, trash icon to delete\n\n' +
        'Enjoy building your personal cookbook!',
      image: DEFAULT_IMAGE,
      isDefault: true,
    });

    await defaultRecipe.save();
    return defaultRecipe;
  } catch (err) {
    console.error('Failed to create default recipe:', err);
    // We don't throw — registration should still succeed
  }
};
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { createDefaultRecipe } = require('../controllers/recipeController');

router.post('/register', async (req, res) => {
  try {
    const response = await authController.register(req, res); // will set session

    // After successful registration, create default recipe
    if (req.session.userId) {
      await createDefaultRecipe(req.session.userId);
    }

    // The register function already sent response
  } catch (err) {
    // already handled in controller
  }
});

router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/me', authController.getCurrentUser);

module.exports = router;
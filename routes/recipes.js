const express = require("express");

const router = express.Router();

const recipesController = require("../controllers/recipes");

router.get("/recipes/:productId", recipesController.getRecipeById);
router.get("/recipes/", recipesController.getAllRecipes);

module.exports = router;

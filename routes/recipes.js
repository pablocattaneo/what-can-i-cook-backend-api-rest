const express = require("express");

const router = express.Router();

const recipesController = require("../controllers/recipes");

router.post("/recipes/create-recipe", recipesController.createRecipes);
router.get("/recipes/:productId", recipesController.getRecipeById);
router.get("/recipes/", recipesController.getRecipes);

module.exports = router;

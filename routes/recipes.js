const express = require("express");
const { body } = require("express-validator/check");

const router = express.Router();

const recipesController = require("../controllers/recipes");

router.post(
  "/recipes/create-recipe",
  [
    body("title")
      .trim()
      .not()
      .isEmpty(),
    body("ingredients")
      .trim()
      .not()
      .isEmpty(),
    body("language")
      .trim()
      .not()
      .isEmpty(),
    body("directions")
      .trim()
      .not()
      .isEmpty()
  ],
  recipesController.createRecipe
);
router.get("/recipes/:productId", recipesController.getRecipeById);
router.get("/recipes/", recipesController.getRecipes);

module.exports = router;

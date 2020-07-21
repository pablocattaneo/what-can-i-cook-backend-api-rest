const express = require("express");
const { body } = require("express-validator");

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
router.get("/recipe/:recipeId", recipesController.getRecipeById);
router.get("/recipe-by-slug/:slug", recipesController.getRecipeBySlug);
router.delete("/recipe/:recipeId", recipesController.deleteRecipe);
router.put(
  "/admin/recipes/editing/:recipeId",
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
  recipesController.updatePost
);
router.get("/recipes/", recipesController.getRecipes);
router.get("/recipess/", recipesController.searchRecipe);

module.exports = router;

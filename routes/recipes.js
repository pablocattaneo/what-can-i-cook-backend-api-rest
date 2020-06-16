const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const recipesController = require("../controllers/recipes");
const isAuth = require("../middleware/is-auth");

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
router.get("/recipes/", isAuth, recipesController.getRecipes);

module.exports = router;

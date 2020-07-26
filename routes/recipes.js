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
      .isEmpty(),
    body("slug")
      .trim()
      .not()
      .isEmpty()
      .custom(value => {
        const urlReservedCharacters = "!#$%&'()*+,/:;=?@[]";
        for (let i = 0; i < urlReservedCharacters.length; i += 1) {
          if (value.includes(urlReservedCharacters[i])) {
            return false;
          }
        }
        return true;
      })
      .withMessage(
        "The content of this field must not contains this characters ! # $ % & '() * + , / : ; = ? @ []"
      )
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

module.exports = router;

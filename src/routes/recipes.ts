import express from 'express';

import {
  getRecipeById, deleteRecipe, getRecipeBySlug, getRecipes, createRecipe, updatePost,
} from '../controllers/recipes';

import { body } from 'express-validator';

const router = express.Router();

router.post(
  '/recipes/create-recipe',
  [
    body('title')
      .trim()
      .not()
      .isEmpty(),
    body('ingredients')
      .trim()
      .not()
      .isEmpty(),
    body('category')
      .trim()
      .not()
      .isEmpty(),
    body('language')
      .trim()
      .not()
      .isEmpty(),
    body('directions')
      .trim()
      .not()
      .isEmpty(),
    body('slug')
      .trim()
      .not()
      .isEmpty()
      .custom((value: string | string[]) => {
        const urlReservedCharacters = "!#$%&'()*+,/:;=?@[]";
        for (let i = 0; i < urlReservedCharacters.length; i += 1) {
          if (value.includes(urlReservedCharacters[i])) {
            return false;
          }
        }
        return true;
      })
      .withMessage(
        "The content of this field must not contains this characters ! # $ % & '() * + , / : ; = ? @ []",
      ),
  ],
  createRecipe,
);
router.get('/recipe/:recipeId', getRecipeById);
router.get('/recipe-by-slug/:slug', getRecipeBySlug);
router.delete('/recipe/:recipeId', deleteRecipe);
router.put(
  '/admin/recipes/editing/:recipeId',
  [
    body('title')
      .trim()
      .not()
      .isEmpty(),
    body('ingredients')
      .trim()
      .not()
      .isEmpty(),
    body('language')
      .trim()
      .not()
      .isEmpty(),
    body('directions')
      .trim()
      .not()
      .isEmpty(),
    body('slug')
      .trim()
      .not()
      .isEmpty()
      .custom((value: string | string[]) => {
        const urlReservedCharacters = "!#$%&'()*+,/:;=?@[]";
        for (let i = 0; i < urlReservedCharacters.length; i += 1) {
          if (value.includes(urlReservedCharacters[i])) {
            return false;
          }
        }
        return true;
      })
      .withMessage(
        "The content of this field must not contains this characters ! # $ % & '() * + , / : ; = ? @ []",
      ),
  ],
  updatePost,
);
router.get('/recipes/', getRecipes);

export default router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { body } = require("express-validator");
const router = express_1.default.Router();
exports.router = router;
const recipes_1 = require("../controllers/recipes");
router.post("/recipes/create-recipe", [
    body("title")
        .trim()
        .not()
        .isEmpty(),
    body("ingredients")
        .trim()
        .not()
        .isEmpty(),
    body("category")
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
        .custom((value) => {
        const urlReservedCharacters = "!#$%&'()*+,/:;=?@[]";
        for (let i = 0; i < urlReservedCharacters.length; i += 1) {
            if (value.includes(urlReservedCharacters[i])) {
                return false;
            }
        }
        return true;
    })
        .withMessage("The content of this field must not contains this characters ! # $ % & '() * + , / : ; = ? @ []")
], recipes_1.createRecipe);
router.get("/recipe/:recipeId", recipes_1.getRecipeById);
router.get("/recipe-by-slug/:slug", recipes_1.getRecipeBySlug);
router.delete("/recipe/:recipeId", recipes_1.deleteRecipe);
router.put("/admin/recipes/editing/:recipeId", [
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
        .custom((value) => {
        const urlReservedCharacters = "!#$%&'()*+,/:;=?@[]";
        for (let i = 0; i < urlReservedCharacters.length; i += 1) {
            if (value.includes(urlReservedCharacters[i])) {
                return false;
            }
        }
        return true;
    })
        .withMessage("The content of this field must not contains this characters ! # $ % & '() * + , / : ; = ? @ []")
], recipes_1.updatePost);
router.get("/recipes/", recipes_1.getRecipes);

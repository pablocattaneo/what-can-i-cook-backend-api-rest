const { validationResult } = require("express-validator/check");
const { getDb } = require("../util/database");

function getRecipesFromDb(filter) {
  const db = getDb().db();
  return db
    .collection("recipes")
    .find(filter)
    .toArray()
    .then(response => {
      return response;
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log("error", error);
    });
}

function insertRecipeToDb(recipes) {
  const db = getDb().db();
  return (async () => {
    const insertOneWriteOpResultObject = await db
      .collection("recipes")
      .insertOne(recipes);
    const insertedResult = insertOneWriteOpResultObject.ops[0];
    return insertedResult;
  })();
}

exports.getRecipeById = (req, res) => {
  res.send(`<h1>Hello recipe ${req.params.productId} !!</h1>`);
};

async function getRecipes(req, res) {
  // eslint-disable-next-line no-console
  console.log("req.query", req.query);
  try {
    const response = await getRecipesFromDb(req.query);
    console.log("response", response);
    return res.status(200).json(response);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("error", error);
    return false;
  }
}

exports.getRecipes = getRecipes;

exports.createRecipe = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      message: "Validation failed",
      errors: errors.array()
    });
  }
  if (!req.file) {
    const error = new Error("The file upload must be png, jpg or jpeg");
    error.statusCode = 422;
    throw error;
  }
  function stringToArray(string, regex = /[\n\r]/g) {
    return string.split(regex);
  }
  const { body } = req;
  console.log("req.file", req.file);
  const imageUrl = req.file.path;
  const recipe = {
    title: body.title,
    ingredients: stringToArray(body.ingredients),
    directions: stringToArray(body.directions),
    language: body.language,
    mainImg: imageUrl
  };
  (async () => {
    try {
      const recipeStored = await insertRecipeToDb(recipe);
      res.status(201).json({
        message: "Recipe was created successfully!",
        data: recipeStored
      });
    } catch (error) {
      console.log("error", error);
    }
  })();
};

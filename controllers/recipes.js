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

exports.getRecipeById = (req, res) => {
  res.send(`<h1>Hello recipe ${req.params.productId} !!</h1>`);
};

async function getRecipes(req, res) {
  // eslint-disable-next-line no-console
  console.log("req.query", req.query);
  try {
    const response = await getRecipesFromDb(req.query);
    return res.status(200).json(response);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("error", error);
    return false;
  }
}

exports.getRecipes = getRecipes;

exports.createRecipes = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      message: "Validation failed",
      errors: errors.array()
    });
  }
  const { body } = req;
  res.status(201).json({
    message: "Recipe was created successfully!",
    data: body
  });
};

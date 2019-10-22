const { getDb } = require("../util/database");

function getRecipesFromDb() {
  const db = getDb().db();
  return db
    .collection("recipes")
    .find()
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
  try {
    const response = await getRecipesFromDb();
    return res.status(200).json(response);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("error", error);
    return false;
  }
}

exports.getRecipes = getRecipes;

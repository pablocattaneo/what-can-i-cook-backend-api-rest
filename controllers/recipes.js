const { getDb } = require("../util/database");

function getRecipes() {
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

exports.getAllRecipes = (req, res) => {
  getRecipes()
    .then(response => {
      return res.status(200).json(response);
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log("error", error);
    });
};

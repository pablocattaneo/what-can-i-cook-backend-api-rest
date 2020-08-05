const { validationResult } = require("express-validator");
const { ObjectId } = require("mongodb");
const { getDb } = require("../util/database");
const { deleteFile } = require("../util/file");

async function getRecipesFromDb(query = [{}], calories, pagination = 0) {
  const db = getDb().db();
  const recipeCollection = await db.collection("recipes");
  const findQuery = await recipeCollection.find(
    {
      $or: query,
      $and: calories ? [{ "more_info.calories": { $lte: +calories } }] : [{}]
    },
    {
      projection: { title: 1, description: 1, mainImg: 1, slug: 1 }
    }
  );
  const totalRecipes = await findQuery.count();
  const recipes = await findQuery
    .limit(10)
    .skip(pagination)
    .toArray();
  return { totalRecipes, recipes };
}

async function searchRecipe(term) {
  const db = getDb().db();
  return new Promise((resolve, reject) => {
    db.collection("recipes").aggregate(
      [
        {
          $search: {
            text: {
              query: term,
              path: "title"
            }
          }
        },
        {
          $project: {
            title: 1,
            description: 1,
            mainImg: 1,
            slug: 1
          }
        }
      ],
      async (cmdErr, result, next) => {
        try {
          resolve({
            recipes: await result.toArray()
          });
        } catch (error) {
          reject(error);
          next(cmdErr);
        }
        return result.toArray();
      }
    );
  });
}

async function insertRecipeToDb(recipes) {
  try {
    const db = getDb().db();
    const insertOneWriteOpResultObject = await db
      .collection("recipes")
      .insertOne(recipes);
    const insertedResult = insertOneWriteOpResultObject.ops[0];
    return insertedResult;
  } catch (error) {
    if (error.code === 11000) {
      Object.keys(error.keyValue).forEach(key => {
        error.customErrorMessage = `${key} ${
          error.keyValue[key]
        } Already exist, please select another one.`;
      });
    }
    throw error;
  }
}

async function updateRecipeFromDb(recipeId, recipeEditedValues) {
  try {
    const db = getDb().db();
    const returnedValueAfterUpdateDocument = await db
      .collection("recipes")
      .updateOne(
        { _id: new ObjectId(recipeId) },
        {
          $set: recipeEditedValues
        }
      );
    return returnedValueAfterUpdateDocument;
  } catch (error) {
    throw new Error(error);
  }
}

exports.deleteRecipe = async (req, res) => {
  const { recipeId } = req.params;
  try {
    let response;
    const db = getDb().db();
    const recipe = await db
      .collection("recipes")
      .findOne({ _id: new ObjectId(recipeId) });
    response =
      recipe === null
        ? { message: "Document does't exist" }
        : { message: "Document exist" };
    if (recipe) {
      const recipeDeleted = await db
        .collection("recipes")
        .deleteOne({ _id: new ObjectId(recipeId) });
      if (recipe.mainImg) {
        deleteFile(recipe.mainImg);
      }
      response = recipeDeleted;
    }
    res.json(response);
  } catch (error) {
    throw new Error(error);
  }
};

exports.getRecipeById = async (req, res) => {
  const { recipeId } = req.params;
  try {
    const db = getDb().db();
    const recipe = await db
      .collection("recipes")
      .findOne({ _id: new ObjectId(recipeId) });
    res.json(recipe);
  } catch (error) {
    throw new Error(error);
  }
};

exports.getRecipeBySlug = async (req, res) => {
  const { slug } = req.params;
  const db = getDb().db();
  const recipe = await db.collection("recipes").findOne({ slug });
  res.json(recipe);
};

async function getRecipes(req, res) {
  try {
    let response;
    const query = req.query.filters ? JSON.parse(req.query.filters) : [{}];
    const calories = req.query.calories || null;
    const pagination = req.query.pagination ? Number(req.query.pagination) : 0;
    if (req.query.term) {
      response = await searchRecipe(req.query.term);
    } else {
      response = await getRecipesFromDb(query, calories, pagination);
    }
    return res.status(200).json(response);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("error", error);
    return false;
  }
}

exports.getRecipes = getRecipes;

exports.createRecipe = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      message: "Validation failed",
      errors: errors.array()
    });
  }
  function stringToArray(string, regex = /[\n\r]/g) {
    return string.split(regex);
  }
  const { body } = req;
  const imageUrl = req.file ? req.file.path : null;
  const moreInfo = JSON.parse(body.moreInfo);
  const recipe = {
    author: new ObjectId(body.author),
    title: body.title,
    description: body.description,
    ingredients: stringToArray(body.ingredients),
    directions: stringToArray(body.directions),
    language: body.language,
    mainImg: imageUrl,
    more_info: {
      serving: parseInt(moreInfo.serving, 10)
        ? parseInt(moreInfo.serving, 10)
        : null,
      cookTime: parseInt(moreInfo.cookTime, 10)
        ? parseInt(moreInfo.cookTime, 10)
        : null,
      readyIn: parseInt(moreInfo.readyIn, 10)
        ? parseInt(moreInfo.readyIn, 10)
        : null,
      calories: parseInt(moreInfo.calories, 10)
        ? parseInt(moreInfo.calories, 10)
        : null
    },
    slug: body.slug
  };
  (async () => {
    try {
      const recipeStored = await insertRecipeToDb(recipe);
      res.status(201).json({
        message: "Recipe was created successfully!",
        data: recipeStored
      });
    } catch (error) {
      next(error);
    }
  })();
};

exports.updatePost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      message: "Validation failed",
      errors: errors.array()
    });
  }
  function stringToArray(string, regex = /[\n\r]/g) {
    return string.split(regex);
  }
  const { body } = req;
  const imageUrl = req.file ? req.file.path : null;
  const moreInfo = JSON.parse(body.moreInfo);
  const recipeEditedValues = {
    title: body.title,
    description: body.description,
    ingredients: stringToArray(body.ingredients),
    directions: stringToArray(body.directions),
    language: body.language,
    mainImg: imageUrl || req.body.mainImg,
    more_info: {
      serving: parseInt(moreInfo.serving, 10)
        ? parseInt(moreInfo.serving, 10)
        : null,
      cookTime: parseInt(moreInfo.cookTime, 10)
        ? parseInt(moreInfo.cookTime, 10)
        : null,
      readyIn: parseInt(moreInfo.readyIn, 10)
        ? parseInt(moreInfo.readyIn, 10)
        : null,
      calories: parseInt(moreInfo.calories, 10)
        ? parseInt(moreInfo.calories, 10)
        : null
    },
    slug: body.slug
  };
  try {
    const result = await updateRecipeFromDb(
      req.params.recipeId,
      recipeEditedValues
    );
    res.json({
      result
    });
  } catch (error) {
    next(error);
  }
};

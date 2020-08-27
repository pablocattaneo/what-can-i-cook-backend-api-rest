import { Request, Response, NextFunction } from "express";

import { validationResult } from "express-validator";
import { ObjectId } from "mongodb";
import { getDb } from "../util/database";
import { deleteFile } from "../util/file";

import { wcRecipes } from "../custom-types";

async function getRecipesFromDb(query = [{}], and = [{}], pagination = 0) {
  const db = getDb().db();
  const recipeCollection = db.collection("recipes");
  const findQuery = recipeCollection.find(
    {
      $or: query,
      $and: and,
    },
    {
      projection: {
        title: 1,
        description: 1,
        mainImg: 1,
        slug: 1,
        author: 1,
      },
    }
  );
  const totalRecipes = await findQuery.count();
  const recipes = await findQuery
    .limit(10)
    .skip(pagination)
    .toArray();
  return { totalRecipes, recipes };
}

async function insertRecipeToDb(recipes: wcRecipes) {
  try {
    const db = getDb().db();
    const insertOneWriteOpResultObject = await db
      .collection("recipes")
      .insertOne(recipes);
    const insertedResult = insertOneWriteOpResultObject.ops[0];
    return insertedResult;
  } catch (error) {
    if (error.code === 11000) {
      Object.keys(error.keyValue).forEach((key) => {
        error.customErrorMessage = `${key} ${
          error.keyValue[key]
        } Already exist, please select another one.`;
      });
    }
    throw error;
  }
}

async function updateRecipeFromDb(
  recipeId: string,
  recipeEditedValues: wcRecipes
) {
  try {
    const db = getDb().db();
    const returnedValueAfterUpdateDocument = await db
      .collection("recipes")
      .updateOne(
        { _id: new ObjectId(recipeId) },
        {
          $set: recipeEditedValues,
        }
      );
    return returnedValueAfterUpdateDocument;
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteRecipe(req: Request, res: Response): Promise<void> {
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
}

export async function getRecipeById(
  req: Request,
  res: Response
): Promise<void> {
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
}

export async function getRecipeBySlug(
  req: Request,
  res: Response
): Promise<void> {
  const { slug } = req.params;
  const db = getDb().db();
  const recipe = await db.collection("recipes").findOne({ slug });
  res.json(recipe);
}

export async function getRecipes(req: Request, res: Response): Promise<string | boolean> {
  const filters = (req.query as { filters: string;}).filters;
  try {
    const and = [];
    const query = filters ? JSON.parse(filters) : [{}];
    const category = req.query.category || null;
    const calories = req.query.calories || null;
    const pagination = req.query.pagination ? Number(req.query.pagination) : 0;
    const term = req.query.term || ''
    if (calories) {
      and.push({ "more_info.calories": { $lte: Number(calories) } });
    }
    if (category) {
      and.push({ category });
    }
    if (and.length === 0) {
      and.push({});
    }
    if(term) {
      and.push({
        $text: {$search: term}
      })
    }
    const response = await getRecipesFromDb(query, and, pagination);
    return res.status(200).json(response) as unknown as string;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("error", error);
    return false;
  }
}

export function createRecipe(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      message: "Validation failed",
      errors: errors.array(),
    });
  }
  function stringToArray(string: string, regex = /[\n\r]/g) {
    return string.split(regex);
  }
  const { body } = req;
  const imageUrl = req.file ? req.file.path : null;
  const moreInfo = JSON.parse(body.moreInfo);
  const recipe: wcRecipes = {
    author: new ObjectId(body.author),
    title: body.title,
    description: body.description,
    ingredients: stringToArray(body.ingredients),
    directions: stringToArray(body.directions),
    category: body.category,
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
        : null,
    },
    slug: body.slug,
  };
  (async () => {
    try {
      const recipeStored = await insertRecipeToDb(recipe);
      res.status(201).json({
        message: "Recipe was created successfully!",
        data: recipeStored,
      });
    } catch (error) {
      next(error);
    }
  })();
}

export async function updatePost(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      message: "Validation failed",
      errors: errors.array(),
    });
  }
  function stringToArray(string: string, regex = /[\n\r]/g) {
    return string.split(regex);
  }
  const { body } = req;
  const imageUrl = req.file ? req.file.path : null;
  const moreInfo = JSON.parse(body.moreInfo);
  const recipeEditedValues: wcRecipes = {
    author: new ObjectId(body.author),
    title: body.title,
    description: body.description,
    ingredients: stringToArray(body.ingredients),
    directions: stringToArray(body.directions),
    category: body.category,
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
        : null,
    },
    slug: body.slug,
  };
  try {
    const result = await updateRecipeFromDb(
      req.params.recipeId,
      recipeEditedValues
    );
    res.json({
      result,
    });
  } catch (error) {
    next(error);
  }
}

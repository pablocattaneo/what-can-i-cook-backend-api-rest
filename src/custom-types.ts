import { ObjectId } from 'mongodb';

export type wcError = {
  statusCode: number;
  customErrorMessage?: string;
};

export type wcRecipes = {
  author: ObjectId;
  title: string;
  description: string;
  ingredients: string[];
  directions: string[];
  category:
    | "appetizers-and-snacks"
    | "breakfast-and-brunch"
    | "desserts"
    | "dinner"
    | "drinks"
    | "lunch";
  language: "es" | "en";
  mainImg: string | null;
  more_info: {
    serving: number | null;
    cookTime: number | null;
    readyIn: number | null;
    calories: number | null;
  };
  slug: string;
};

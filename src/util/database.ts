import mongodb from "mongodb";

const mongoClient = mongodb.MongoClient;

let db: mongodb.MongoClient;

export async function mongoConnect(uri: string): Promise<string> {
  try {
    const mongoClientIntance = await mongoClient.connect(
      uri,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    // eslint-disable-next-line no-console
    console.log("Connected successfully to on mongo server");
    db = mongoClientIntance;
    return "promise fulfilled";
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("error", error);
    throw error;
  }
}

export function getDb(): mongodb.MongoClient {
  if (db) {
    return db;
  }
  throw new Error("No database found");
}

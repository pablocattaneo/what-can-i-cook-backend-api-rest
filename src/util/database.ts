import mongodb from 'mongodb';

const mongoClient = mongodb.MongoClient;

let db: any;

export function mongoConnect(uri: any, callback: any) {
  mongoClient
    .connect(
      uri,
      { useNewUrlParser: true, useUnifiedTopology: true },
    )
    .then((mongoClientIntance) => {
      // eslint-disable-next-line no-console
      console.log('Connected successfully to on mongo server');
      db = mongoClientIntance;
      callback();
      return 'promise fulfilled';
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log('error', error);
      throw error;
    });
}

export function getDb() {
  if (db) {
    return db;
  }
  throw new Error('No database found');
}

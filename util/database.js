const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

function mongoConnect(url, dbName) {
  const client = new MongoClient(url, { useUnifiedTopology: true, useNewUrlParser: true });
  
  // Use connect method to connect to the Server
  client.connect((err) => {
    assert.equal(null, err);
    console.log("Connected successfully to on mongo server");
  
    const db = client.db(dbName);

    db.collection('products')
      .find()
      .toArray()
      .then(r=>{
        console.log("products", r);
      });

    client.close();
    
  }, { useNewUrlParser: true });
}

module.exports = mongoConnect;


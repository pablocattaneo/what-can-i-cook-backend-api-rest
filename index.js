const assert = require('assert');

const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const adminRoutes = require('./routes/admin');
const adminshop = require('./routes/shop');

const app = express();

app.use(adminRoutes);
app.use(adminshop);

// // Connection URL
// const url = 'mongodb://localhost:27017';

// // Database Name
// const dbName = 'myproject';

// // Create a new MongoClient
// const client = new MongoClient(url);

// // Use connect method to connect to the Server
// client.connect(function(err) {
//   assert.equal(null, err);
//   console.log("Connected successfully to on mongo server");

//   const db = client.db(dbName);

//   client.close();
// });

// console.log("index.js");

app.listen(5000)
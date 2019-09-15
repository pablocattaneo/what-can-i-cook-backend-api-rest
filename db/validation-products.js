db.createCollection("recipes", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "price", "stock"],
      properties: {
        name: {
          bsonType: "string",
          description: "Must be a string and is required"
        },
        price: {
          bsonType: "decimal",
          description: "Must be a decimal and is required"
        },
        stock: {
          bsonType: "int",
          description: "Must be an int and is required"
        },
        description: {
          bsonType: "string",
          description: "Must be a string"
        },
        mainImg: {
          bsonType: "string",
          description: "Must be a string"
        },
        thumbnailImg: {
          bsonType: "string",
          description: "Must be a string"
        },
      }
    }
  }
}
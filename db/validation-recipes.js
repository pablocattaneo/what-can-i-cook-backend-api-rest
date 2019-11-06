db.runCommand({
  collMod:'recipes',
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['title', 'ingredients', 'language'],
      properties: {
        title: {
          bsonType: 'string',
          description: 'Must be a string and is required',
        },
        ingredients: {
          bsonType: 'array',
          description: 'Must be an array and is required',
          items: {
            bsonType: 'string',
          },
        },
        language: {
          bsonType: 'string',
          enum: ["es", "en"],
          description: 'Must be an string and accept only "es" or "en" as a value ',
        },
        description: {
          bsonType: 'string',
          description: 'Must be a string',
        },
        mainImg: {
          bsonType: 'array',
          description: 'Must be an array',
          items: {
            bsonType: 'string',
          },
        },
        thumbnailImg: {
          bsonType: 'string',
          description: 'Must be a string',
        },
        comments: {
          bsonType: ['array', 'null'],
          description: 'Must be an array or null',
          items: {
            bsonType: 'string',
          }
        },
        more_info: {
          bsonType: 'object',
          description: 'Must be an object',
          properties: {
            serving: {
              bsonType: 'int',
              description: 'Must be a 32-bit integer',
            },
            cookTime: {
              bsonType: 'int',
              description: 'Must be a 32-bit integer',
            },
            readyIn: {
              bsonType: 'int',
              description: 'Must be a 32-bit integer',
            },
            calories: {
              bsonType: 'int',
              description: 'Must be a 32-bit integer',
            }
          }
        }
      },
    },
  },
});

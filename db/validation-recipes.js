db.runCommand({
  collMod:'recipes',
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['title', 'ingredient', 'serving'],
      properties: {
        title: {
          bsonType: 'string',
          description: 'Must be a string and is required',
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
        ingredient: {
          bsonType: 'array',
          description: 'Must be an array and is required',
          items: {
            bsonType: 'object',
            required: ['productId', 'amount'],
            properties: {
              productId: {
                bsonType: 'objectId',
                description: 'Must be an objectId and is required',
              },
              amount: {
                bsonType: 'decimal',
                description: 'Must be an decimal and is required',
              },
            },
          },
        },
        comments: {
          bsonType: ['array', 'null'],
          description: 'Must be an array or null',
          items: {
            bsonType: 'string',
          },
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

db.runCommand({
  collMod:'recipes',
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['author','title', 'ingredients', 'language', 'directions', 'slug', 'category'],
      properties: {
        author: {
          bsonType: 'objectId',
          description: 'Must be a objectId and is required',
        },
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
        directions: {
          bsonType: 'array',
          description: 'Must be an array',
          items: {
            bsonType: 'string',
          },
        },
        slug: {
          bsonType: 'string',
          description: 'Must be a string'
        },
        category: {
          bsonType: 'string',
          enum: ["Appetizers & Snacks", "Breakfast & Brunch", "Desserts", ,"Dinner", "Drinks", "Lunch"],
          description: 'Must be an string and accept only "Appetizers & Snacks" or "Breakfast & Brunch" or "Desserts" or "Dinner" or "Drinks" or "Lunch" as a value '
        },
        description: {
          bsonType: 'string',
          description: 'Must be a string',
        },
        mainImg: {
          bsonType: ['string', "null"],
          description: 'Must be an string',
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
              bsonType: ['int', 'null'],
              description: 'Must be a 32-bit integer value or null',
            },
            cookTime: {
              bsonType: ['int', 'null'],
              description: 'Must be a 32-bit integer value or null',
            },
            readyIn: {
              bsonType: ['int', 'null'],
              description: 'Must be a 32-bit integer value or null',
            },
            calories: {
              bsonType: ['int', 'null'],
              description: 'Must be a 32-bit integer value or null',
            }
          }
        }
      },
    },
  },
});

db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['username', 'name', 'lastName', 'email'],
      properties: {
        username: {
          bsonType: 'string',
          description: 'Must be a string and is required',
        },
        name: {
          bsonType: 'string',
          description: 'Must be a string and is required',
        },
        lastName: {
          bsonType: 'string',
          description: 'Must be a string and is required',
        },
        email: {
          bsonType: 'string',
          description: 'Must be a string and is required',
        },
        favoritesRecipes: {
          bsonType: 'array',
          description: 'Must be an array',
          uniqueItems: true,
          items: {
            bsonType: 'object',
            required: ['title', 'description'],
            properties: {
              title: {
                bsonType: 'string',
                description: 'Must be a string and is required',
              },
              description: {
                bsonType: 'string',
                description: 'Must be a string and is required',
              },
            },
          },
        },
      },
    },
  },
});

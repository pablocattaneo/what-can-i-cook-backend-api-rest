db.runCommand({
  collMod:'users',
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
        }
      },
    },
  },
});

db.runCommand({
  collMod:'users',
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['userName', 'name', 'lastName', 'email'],
      properties: {
        userName: {
          bsonType: 'string',
          description: 'Must be a string and is required',
        },
        password: {
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

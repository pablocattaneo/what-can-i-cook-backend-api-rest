db.recipes.createIndex({slug: 1}, {unique: true})
db.recipes.createIndex({description: "text", title: "text"})
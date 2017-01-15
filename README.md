#MEAN stack app

This is a test creating a MEAN recipe app.

## Run the app
nodemon

nodemon is a utility that monitor your application files for changes and automatically restart your node application when changes are saved.
On run of nodemon in your terminal, it looks for your package.json for the scripts.start
nodemon has a verbose mode, for that, in the nodemon.js, add set property verbose to true.

## NoSQL

Different types:

 * key-value store
 * document store (used by mongoDB)
 * graph databased

## MongoDB commands
start mongo : mongod --dbpath /data/db --port 27017
start shell : mongo


- `show dbs` see all of the databases
- `use local` use dabate call local
- `show collections` show the collections in the current database
- `use dbname` MongoDB you don't really have to do anything to create a database, you just use it for the first time
- `db.createCollection("tech")`
- ` db.tech.insert(
	    {
	      name : "MongoDB",
	      role : "Database"
    	}
	);` Create a document
- `db.tech.find()` show us all of the documents in the collection
- `db.tech.find().pretty()` Making the output more readable

Interacting with data from the command line

- `db.tech.find({"_id" : ObjectId("587ac50d8f399aa288a6cac9")})` query object
- `db.tech.find({"name" : "Angular"})` query property name
- `db.tech.find().sort({"name": 1})` sorting results, ascending = 1, descending = -1
- `db.tech.find({}, {"name" : true })` return only the value on one selected property
- `db.tech.find({}, {"name" : true , "_id": false })` return only the value on one selected property, without object id
- `db.tech.update(
	{ "name": "Angular" },
	{ $set : { "name": "AngularJS" }})` updating (single) document, only first instance/occurance will be updated
- `db.tech.update(
	{},
	{ $set : { "language": "JavaScript" }},
	{ multi: true }) update all the documents in the collection
- `db.tech.remove( { "name": "Express" } )` deleting document
- `db.tech.remove({})` deleting all collections
- `db.tech.drop()` delete entire collection from db (ex: tech), use drop

Two options to create a binary export of a DB:

 1) bson/json
 - `mongodump` specify the db otherwise will affect all
 - `cd dumb` and `ls` locate the data, by default set on same directory
 - `cd dbname` and `ls` list the data, will show a .bson and .json versions

 2) gziped
 - `mongodump --db dbname --gzip` options to gzip the results when db very large

How to restore db that has been just exported:
- `mongorestore --db newdbname --gzip dump/dbname`
Please note mongorestore only insert in db and does not update

Export a collection from a db: (do not run on shell)
- `mongoexport --db dbname --collection tech` export in console log only
- `mongoexport --db dbname --collection tech --out /Users/pathto/MEAN/api/data/tech.json` the actual output is not a valid json
- `mongoexport --db dbname --collection tech --jsonArray --out /Users/pathto/MEAN/api/data/tech.json` minified
- `mongoexport --db dbname --collection tech --jsonArray --out /Users/pathto/MEAN/api/data/tech.json --pretty` prettified

Import a collection from a db: (do not run on shell)
- `mongoimport --db dbname --collection tech --jsonArray /Users/pathto/MEAN/api/data/tech.json`

## URLs
how should URL should be structured:

Method | URL                            | Action
-------|--------------------------------|-----------------------------------
GET    | /api/recipes                   | Get all multiple recipes
GET    | /api/recipes                   | Get all/multiple recipes
POST   | /api/recipes                   | Create new recipe
GET    | /api/recipes/1234              | Get specific recipe
PUT    | /api/recipes/1234              | Update specific recipe
DELETE | /api/recipes/1234              | Delete specific recipe
-------|--------------------------------|------------------------------------
GET    | /api/recipes/1234/reviews      | Get all reviews for specific hotel
POST   | /api/recipes/1234/reviews      | Add review for specific hotel
GET    | /api/recipes/1234/reviews/4321 | Get a specific review
PUT    | /api/recipes/1234/reviews/4321 | Update a specific review
DELETE | /api/recipes/1234/reviews/4321 | Delete a specific review


## More mongo
We're creating a route for specific review such as : .route('/recipes/:recipeId/reviews/:reviewId'), but in the data, review do not have a an ID.
Go to the mongo shell:

 - `use dbname`
 - `db.recipes.update(
  {},
  {
    $set : {
      "reviews.0._id": ObjectId()
    }
  },
  {
    multi: true
  }
)`  update all finds

#other tools used:
postman
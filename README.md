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

### Useful commands:
- `shows dbs` see all of the databases
- `use local` use dabate call local
- `show collections` show the collections in the current database
- `use dbname` MongoDB you don't really have to do anything to create a database, you just use it for the first time
- `db.createCollection("tech")`
- ` db.tech.insert(
    {
      name : "MongoDB",
      role : "Database
    }
)` Create a document
- `db.tech.find()` show us all of the documents in the collection
- `db.tech.find().pretty()` Making the output more readable



#other tools used:
postman
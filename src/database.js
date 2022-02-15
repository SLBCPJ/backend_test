const mongoose = require('mongoose');
const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose
  .connect(process.env.DB_STRING, options)
  .then((db) => console.log("Connected to MongoDb:", db.connection.name))
  .catch((error) => console.log(error));

module.exports=mongoose
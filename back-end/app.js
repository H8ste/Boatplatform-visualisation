import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

import routes from "./routes/index.js";

const app = express();

/**
 * Connect to the database
 */
// const recipeRoute = require("./routes/recipe.route");
mongoose.Promise = global.Promise;
// const password = "heineognocklars123";
// "mongodb+srv://mta19735:46E5u5ufq1uoZSZU@cluster0-iryio.mongodb.net/test?retryWrites=true";
// const uri =
//   "mongodb+srv://mta19735:46E5u5ufq1uoZSZU@boatdata-vidln.gcp.mongodb.net/test?retryWrites=true&w=majority";
const uri = "mongodb://localhost:27017/node-express-mongodb-server";

mongoose.connect(uri, (error, database) => {
  if (error) {
    console.log("Had issues connecting to database");
  } else {
    console.log("Connected to database");
    console.log(database.host + ":" + database.port);
  }
});

/**
 * Middleware
 */

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// catch 400
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(400).send(`Error: ${res.originUrl} not found`);
  next();
});

// catch 500
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send(`Error: ${err}`);
  next();
});

/**
 * Register the routes
 */

routes(app);

export default app;

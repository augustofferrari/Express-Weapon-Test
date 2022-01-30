import express from "express";
import routes from "./routes";
import pino from "express-pino-logger";
//Configs for dotenv
import { resolve } from "path";
import dotenv from "dotenv";
dotenv.config({ path: resolve(__dirname, ".env") });

//Request parser
var bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(routes);

app.listen(30100, () => {
  console.log("App is running ");
});

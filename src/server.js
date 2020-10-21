const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const {MONGO_KEY, DB_NAME} = process.env;
const MONGO_URL = `mongodb+srv://mikiteek:${MONGO_KEY}@cluster0.pjuye.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

class HandlerServer {
  constructor() {
    this.server = null;
  }

  async start() {
    this.initServer();
    this.initMiddlewares();
    this.initRoutes();
    await this.initDatabase();
    this.startListening();
  }

  initServer() {
    this.server = express();
  }

  initMiddlewares() {
    this.server.use(express.json());
    this.server.use(cors({origin: `http://localhost:${PORT}`}));
    this.server.use(morgan("combined"));
  }

  initRoutes() {
    console.log("Init routes here");
  }

  async initDatabase() {
    try {
      await mongoose.connect(MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});
      console.log(`Mongoose has connected to DB ${DB_NAME}`);
    }
    catch (error) {
      console.log(error);
    }
  }

  startListening() {
    this.server.listen(PORT, () => {
      console.log("Server listening on port", PORT);
    });
  }

}

module.exports = HandlerServer;
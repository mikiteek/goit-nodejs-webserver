const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const contactRouter = require("./routes/contactsRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");

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
    this.initErrorMiddleware();
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
  initErrorMiddleware() {
    this.server.use(errorMiddleware);
  }

  initRoutes() {
    this.server.use("/api/contacts", contactRouter)
  }

  async initDatabase() {
    try {
      await mongoose.connect(MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});
      console.log(`Mongoose has connected to DB ${DB_NAME}`);
    }
    catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

  startListening() {
    this.server.listen(PORT, () => {
      console.log("Server is listening on port", PORT);
    });
  }

}

module.exports = HandlerServer;
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const mongooseOptions = require("./utils/mongooseOptions");
const contactRouter = require("./routes/contactsRoutes");
const authRouter = require("./routes/authRoutes");
const usersRouter = require("./routes/usersRouter");
const errorMiddleware = require("./middlewares/errorMiddleware");

const PORT = process.env.PORT || 3000;
const {DATABASE_URL} = process.env;

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
    this.server.use(express.static("src/public"));
    this.server.use(express.json());
    this.server.use(cors({origin: `http://localhost:${PORT}`}));
    this.server.use(morgan("combined"));
  }
  initErrorMiddleware() {
    this.server.use(errorMiddleware);
  }

  initRoutes() {
    this.server.use("/api/contacts", contactRouter);
    this.server.use("/auth", authRouter);
    this.server.use("/users", usersRouter);
  }

  async initDatabase() {
    try {
      await mongoose.connect(MONGO_URL, mongooseOptions);
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
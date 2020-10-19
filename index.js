const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const contactsRoute = require("./src/routes/contactsRoute");

const app = express();
const PORT = 3000;

app.use(express.json())
app.use(cors({origin: "http://localhost:3000"}));
app.use(morgan("combined"))

app.use("/api/contacts", contactsRoute);

app.listen(PORT, () => {
  console.log("Started listening on port ", PORT)
});
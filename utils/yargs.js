const yargs = require("yargs");

const argv = yargs
  .string("action")
  .number("id")
  .string("name")
  .string("email")
  .string("phone")
  .alias("action", "a")
  .alias("name", "n")
  .alias("email", "e")
  .alias("phone", "p").argv;

exports.argv = argv;
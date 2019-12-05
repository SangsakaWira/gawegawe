const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect("mongodb://localhost/gawegawe-database", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });

  mongoose.connection.once("connected", () => console.log("DB Connected"));
};
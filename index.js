const express = require('express');
const app = express();
const port = 1711;
const mongoose = require("mongoose")
const mongoURI = "mongodb://localhost:27017/cchackserver"
// api
require("./startup/routes")(app);
// view
app.set("view engine", "ejs");
//logger 
require("./startup/logger")(app);
// Connect to MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });


app.listen(port, () => console.log(`Server running on port ${port}`));



module.exports = app;
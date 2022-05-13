const express = require("express");

let detail = require("./model");
const app = express();
const cors = require("cors");
const PORT = 4000;
const mongoose = require("mongoose");
app.use(cors());

//Create Router before connection to make end points
const router = express.Router();
app.use("/", router);
//handler for router 
router.route("/getData").get(function(req, res) 
{
    detail.find({}, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  });


mongoose.connect("mongodb://127.0.0.1:27017/details", {
  useNewUrlParser: true
});

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("Connection with MongoDB was successful");
});

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
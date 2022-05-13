
import mongoose from 'mongoose';
mongoose.connect("mongodb://127.0.0.1:27017/details", {
  useNewUrlParser: true
});

const connection = mongoose.connection;

connection.once("open", function() {
    console.log("Connection with MongoDB was successful");
  });
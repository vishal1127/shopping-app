const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
// const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// app.use((req, res, next) => {
//   User.findById("64354b0b16f1ae6ffe4079ff")
//     .then((user) => {
//       req.user = new User(user.name, user.email, user.cart, user._id); // now the object stores all
//       //the user data with the methods and not just the data returned by the database
//       next();
//     })
//     .catch((err) => console.log(err));
// });

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://vishal:admin@shopapp.upwujhl.mongodb.net/shop?retryWrites=true&w=majority" // with name of database as 'shop'
  )
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));

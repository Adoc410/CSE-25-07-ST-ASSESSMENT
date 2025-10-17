1; //Dependencies
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const expressSession = require("express-session");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");

require("dotenv").config();
//import routes
const userRoute = require("./routes/userRoute");


2; //Instantiations
const app = express();
const port = 3000;

3; //Configurations
//setting up mongoDB collection
mongoose.connect(process.env.MONGODB_URL, {});

mongoose.connection
  .on("open", () => {
    console.log("Mongoose connected!");
  })
  .on("error", (err) => {
    console.log(`Connection error: ${err.message}`);
  });

// Setting view engine to pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

4; //MIDDLE WARE
//method override
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

//express session config
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL }),
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, //one day(time it takes to expire)
  })
);
//Passport configs
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/", userRoute);

// non-existent route handler (Second last)
app.use((req, res) => {
  res.status(404).send("Oops! Route not found: " + req.originalUrl);
});

6; //Bootstrapping Server
//This should always be the last line in this file.
app.listen(port, () => console.log(`listening on port ${port}`));

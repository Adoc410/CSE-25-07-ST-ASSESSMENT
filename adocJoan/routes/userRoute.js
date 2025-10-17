const express = require("express");
const router = express.Router();
const passport = require("passport");

const UserModel = require("../modules/userModel");
//login
router.get("/login", (req, res) => {
  res.render("login");
});

// POST login (authentication)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user || user.password !== password) {
    return res.render("login", { error: "Invalid email or password" });
  }

  // Successful login
  res.redirect("/success"); 
});


router.get("/success", (req, res) => {
  res.render("success");
});



//getting the Signup form
router.get("/signup", (req, res) => {
  res.render("signup", { title: "signup page" });
});

router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, confirmPassword } =
      req.body;

    // check passwords match
    if (password !== confirmPassword) {
      return res.render("signup", {
        error: "Passwords do not match",
        fullName,
        email,
        phoneNumber,
      });
    }

    // check if user exists
    let existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.render("signup", {
        error: "User already exists",
        fullName,
        email,
        phoneNumber,
      });
    }

    // create user
    const user = new UserModel({ fullName, email, phoneNumber, password });
    await user.save();

    // render form again with success message
    res.render("signup", {
      success: "Account created successfully!",
    });
  } catch (error) {
    console.error(error);
    res.render("signup", {
      error: "Something went wrong. Please try again.",
      fullName: req.body.fullName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
    });
  }
});








module.exports = router;

const express = require("express");
const router = express.Router();
const warpAsync = require("../utils/warpAsync");
const passport = require("passport");
const { isLoggedIn, saveRedirectUrl } = require("../middleware.js");
const {
  renderSignUpForm,
  signUp,
  renderLoginForm,
  login,
  logout,
} = require("../controllers/users.js");

router.route("/signup").get(renderSignUpForm).post(warpAsync(signUp));

router
  .route("/login")
  .get(renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    login
  );

router.get("/logout", isLoggedIn, logout);

module.exports = router;

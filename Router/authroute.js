const express = require("express");
const router = express.Router();
const passport = require("passport");
// const { check, body } = require("express-validator/check");
const authController = require("../controller/authcontroller");

const {
  checkisNotAthenticated,
  checkisAthenticated,
} = require("../middleware/is-auth");


const use = (fn)=> (req,res,next)=>{
  Promise.resolve(fn(req,res,next)).catch(next)
}


router.get("/login", checkisNotAthenticated, authController.getlogin);

router.post(
  "/login",
  checkisNotAthenticated,
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
    successRedirect: "/dashbord",
  }),
  authController.postlogin
);

router.get("/signup", checkisNotAthenticated, authController.getsignup);

router.post("/signup", checkisNotAthenticated, authController.postsignup);

router.get("/dashbord", checkisAthenticated, authController.dashbord);

router.get("/viewUser", checkisAthenticated, authController.viewuser);

router.get("/delete-user/:id", checkisAthenticated, authController.deleteUser);

router.get("/update-user/:id", checkisAthenticated, authController.getUpdate);

router.post("/editUser", checkisAthenticated, authController.postUpdateUser);

router.get("/logout", checkisAthenticated, authController.logout);
module.exports = router;

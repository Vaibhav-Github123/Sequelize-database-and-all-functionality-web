const { User, Product } = require("../config/db");
const bcryptjs = require("bcryptjs");
// const Product = require("../models/Product");

exports.getlogin = async (req, res) => {
  const message = req.flash("message");
  const error = req.flash("error");
  res.render("login", { messages: message, Error: error });
};

exports.getsignup = async (req, res) => {
  const error = req.flash("messages");
  res.render("signup", { Error: error });
};

exports.postlogin = async (req, res, next) => {
  try {
    // const { email, password } = req.body;
    // const userExisting = await User.findOne({ where: { email: email } });
    // if (!userExisting) {
    //   req.flash("error", "User not found");
    //   return res.redirect("/login");
    // }
    // const valid = await bcryptjs.compare(password, userExisting.password);
    // if (!valid) {
    //   req.flash("error", "password not matched");
    //   return res.redirect("/login");
    // }
    // req.flash("message", "User Login Successfully");
    // res.redirect("/dashbord");
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.postsignup = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password, phone} = req.body;

    // Validate that required fields are provided
    if (!firstname || !lastname || !email || !password || !phone ) {
      req.flash("error", "required fields are missing");
      return res.redirect("/signup");
    }

    // Check if user with same email already exists
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      req.flash("error", "user already exists");
      return res.redirect("/signup");
    }

    // Create new user in the database
    let hashPassword = await bcryptjs.hash(password, 10);

    let newUser = new User({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashPassword,
      phone: phone,
    });

    await newUser.save();

    req.flash("message", "user register successfully");
    res.redirect("/login");
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.dashbord = async (req, res, next) => {
  const users = await User.findAll();
  // {include: [{ model: Product, attributes: ["id"] }],}

  const message = await req.flash("message");
  const messagedel = await req.flash("messagedel");

  res.render("dashbord", {
    users: users,
    messages: message,
    messageDel: messagedel,
  });
};

exports.viewuser = async (req, res) => {
  try {
    const user = await User.findAll();

    const users = user.map((user) => {
      return {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        phone: user.phone,
        
      };
    });
    return res.status(200).json({
      success: false,
      data: users,
      message: "all user found successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    const userDelete = await User.destroy({ where: { id } });

    if (userDelete) {
      req.flash("messagedel", "User Delete Success...");
      res.redirect("/dashbord");
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getUpdate = async (req, res) => {
  const id = req.params.id;

  const user = await User.findOne({ where: { id } });
  res.render("editUser", {
    users: user,
  });
};

exports.postUpdateUser = async (req, res) => {
  try {
    const { firstname, lastname, email, phone } = req.body;
    const id = req.body.id;
    const user = await User.update(
      {
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone: phone,
      },
      { where: { id } }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    // user.firstname = firstname;
    // user.lastname = lastname;
    // user.email = email;
    // user.phone = phone;

    // await user.save();

    // if(!req.xhr) {
    // }
    res.redirect("/dashbord");

    // return res.status(200).json({
    //   success: true,
    //   data: user,
    //   message: "User Update Successfully Done...",
    // });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    await logout(req);

    res.redirect("/login");
  } catch (error) {
    console.log("error");
  }
};

const logout = (req) => {
  return new Promise((resolve, reject) => {
    req.logout((err) => {
      if (err) reject(false);
      else resolve(true);
    });
  });
};

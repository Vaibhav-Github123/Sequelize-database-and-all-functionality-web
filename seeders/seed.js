const { User } = require("../config/db");
const bcryptjs = require("bcryptjs");

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASS;

exports.seedAdmin = async () => {
  const adminUser = await User.findOne({ email });
  if (!adminUser) {
    const hashpass = await bcryptjs.hash(password, 10);
    await User.create({
      firstname: "admin",
      email: email,
      password: hashpass,
    });
    console.log("User");
  }else{
console.log("Admin User");
  }
};

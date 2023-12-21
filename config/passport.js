const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../config/db");
const bcryptjs = require("bcryptjs");

// module.exports = (passport) => {
//   passport.serializeUser(function (user, done) {
//     done(null, user.id);
//   });

//   passport.deserializeUser(function (id, done) {
//     User.findByPk(id).then(function (user) {
//       if (user) {
//         done(null, user.get());
//       } else {
//         done(user, null);
//       }a
//     });
//   });

//   passport.use(
//     "local",
//     new LocalStrategy(
//       {
//         // by default, local strategy uses username and password, we will override with email
//         usernameField: "email",
//         passwordField: "password",
//         passReqToCallback: true, // allows us to pass back the entire request to the callback
//       },
//       function (req, email, password, done) {
//         var isValidPassword = function (userpass, password) {
//           return bcryptjs.compareSync(password, userpass);
//         };
//         User.findOne({
//           where: {
//             email: email,
//           },
//         })
//           .then(function (user) {
//             if (!user) {
//               return done(null, false, {
//                 message: "Email does not exist",
//               });
//             }
//             if (!isValidPassword(user.password, password)) {
//               return done(null, false, {
//                 message: "Incorrect password.",
//               });
//             }
//             var userinfo = user.get();
//             return done(null, userinfo);
//           })
//           .catch(function (err) {
//             console.log("Error:", err);
//             return done(null, false, {
//               message: "Something went wrong with your Signin",
//             });
//           });
//       }
//     )
//   );
// };

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    if (user) {
      return done(null, user.id);
    }
    return done(null, false);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id);
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async function (username, password, done) {
        const user = await User.findOne({ where: { email: username } });

        if (!user) {
          return done(null, false, {
            type: "error",
            message: "Email Or Password Incorrect!!",
          });
        }

        const isvalid = await bcryptjs.compare(password, user.password);

        if (!isvalid) {
          return done(null, false, {
            type: "error",
            message: "Email Or Password Incorrect!!",
          });
        }
        return done(null, user, {
          type: "message",
          message: "User Login Successfully Done....",
        });
      }
    )
  );
};

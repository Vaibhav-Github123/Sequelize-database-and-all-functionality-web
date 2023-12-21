require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const db = require("./config/db");
const router = require("./Router/index");
// const csrf = require("csurf");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const path = require("path");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const seed = require("./seeders/seed")
// const csrfProtection = csrf();
require("./config/passport")(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Syncecd db..");
  })
  .catch((err) => {
    console.log("failed to db." + err);
  });

// app.use(csrfProtection);
app.use(flash());

// app.use((req, res, next) => {
//   res.locals.isAuthenticated = req.session.isLoggedIn;
//   res.locals.csrfToken = req.csrfToken();
//   next();
// });

const options = {
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
};

const sessionStore = new MySQLStore(options);

app.use(
  session({
    key: process.env.KEY,
    secret: process.env.SECERT,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(
  session({
    secret: process.env.Secret,
    saveUninitialized: true,
    resave: true,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    },
  })
);

seed.seedAdmin()

app.use(passport.initialize());
app.use(passport.session());
app.use("/", router);


app.use((err,req,res,next)=>{
  const errStatus = err.StatusCode || 500
  const errMessage = err.Message
  return res.Status(errStatus).json({
    success: false,
    errMessage
  })
})

app.listen(PORT, () => {
  console.log("server runing http://localhost:4000");
});

// npm install express-mysql-session --save

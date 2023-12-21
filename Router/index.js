const express = require("express");
const router = express.Router();

const authRouter = require("../Router/authroute");
const productRouter = require("../Router/productroute");
const { checkisAthenticated } = require("../middleware/is-auth");

router.use("/",(["admin"]), authRouter);
router.use("/admin", checkisAthenticated,(["user","admin"]), productRouter);

module.exports = router;

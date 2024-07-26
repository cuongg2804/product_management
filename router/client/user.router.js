const express = require("express") ;
const router = express.Router() ;
const user = require("../../controller/client/user.controller");


router.get("/register", user.index);

// POST /user/register

router.post("/register", user.registerPost);

// GET /user/login

router.get("/login", user.login);

// POST /user/login

router.post("/login", user.loginPost);

// GET /user/logout

router.get("/logout", user.logout);

// /password/forgot

router.get("/password/forgot", user.forgot);

// POST /user/password/forgot

router.post("/password/forgot", user.forgotPost);

// GET /user/password/otp

router.get("/password/otp", user.otp);

// POST /user/password/otp

router.post("/password/otp", user.otpPost);

// GET /user/password/reset

router.get("/password/reset", user.reset);

// POST /user/password/reset

router.post("/password/reset", user.resetPost);

// GET /user/info

router.get("/info", user.infor);

module.exports = router ;
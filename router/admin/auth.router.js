const express = require("express") ;
const router = express.Router() ;
const Auth = require("../../controller/admin/auth.controller");
// GET /admin/auth/login

router.get("/login", Auth.login);

router.post("/login", Auth.loginPost);

// GET /admin/auth/logout

router.get("/logout", Auth.logout);

module.exports = router ;
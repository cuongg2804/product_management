const express = require("express");
const database = require("./config/database")
const systemConfig = require("./config/system");
const app = express();
const dotenv = require("dotenv");
const methodOverride = require("method-override");
var bodyParser = require('body-parser');
var flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');

dotenv.config();

const routersClient = require("./router/client/index.router");
const routersAdmin = require("./router/admin/index.router");
//Flash
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
//End Flash

app.use(express.static("public"));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));

app.locals.prefixAdmin = systemConfig.prefixAdmin;

//Router 
app.set("view engine", "pug");
app.set("view engine", `views`);

database.connect();
routersClient(app);
routersAdmin(app);
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Đã kết nối tới cổng: ${port}`);
});
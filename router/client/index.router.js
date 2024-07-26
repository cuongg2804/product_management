const homeRouter = require("./home.router");
const productRouter = require("./product.router");
const searchRouter = require("./search.router");
const categoryMiddlewares = require("../../middlewares/client/category.middlewares");
const cartMiddlewares = require("../../middlewares/client/cart.middlewares");
const cart = require("./cart.router");
const checkout = require("./checkout.router");
const user = require("./user.router");
const userMiddlewares = require("../../middlewares/client/user.middlewares");
const middlewareSetting = require("../../middlewares/admin/setting.middleware");
module.exports = (app) => {
    app.use(categoryMiddlewares.category);

    app.use(cartMiddlewares.Cart);

    app.use(userMiddlewares.inforUser);

    app.use(middlewareSetting.settingsGeneral);

    app.use("/", homeRouter);
    
    app.use("/products", productRouter);

    app.use("/search", searchRouter);

    app.use("/cart", cart);

    app.use("/checkout", checkout);

    app.use("/user", user);

}

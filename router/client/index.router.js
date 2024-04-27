const homeRouter = require("./home.router");
const productRouter = require("./product.router");
module.exports = (app) => {
    app.use("/", homeRouter);
    
    app.use("/products", productRouter);
}

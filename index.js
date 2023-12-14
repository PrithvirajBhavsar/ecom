const express = require("express");
const mongoose  = require("mongoose");
const userRoutes = require("./controllers/user/user");
const addressRoutes = require("./controllers/user/address");
const productCategoryRoutes = require("./controllers/product/product_category");
const authUserRoutes = require("./controllers/user/auth");

const app = express();

const port = process.env.PORT || 5000;
const mongooseURI = process.env.MONGOOSE_URI || "mongodb://localhost:27017/ecom";

app.use(express.json());

app.get("/", (req,res) => {
    res.send("Hello World!");
})

app.use("/", userRoutes);
app.use("/", addressRoutes);
app.use("/", productCategoryRoutes);
app.use("/", authUserRoutes);

const initServer = async () => {
    try {
        await mongoose.connect(mongooseURI);
        const server = app.listen(port, ()=>{
            console.log(`server started on port ${port}`);
        })

        return server;
    } catch (error) {
        console.log(error);
    }
}

initServer();
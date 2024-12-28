const express = require("express");
const port = 9606;
const app = express();
const path = require("path")
const dbconnect = require("./config/dbconnection")
const cookieParser = require("cookie-parser")

app.set("view engine", "ejs");
app.use(express.urlencoded())
app.use(cookieParser())
app.use("/assets", express.static(path.join(__dirname, "assets")))
app.use("/uploads", express.static(path.join(__dirname,"uploads")))

app.use("/",require("./routes/authRoutes"))
app.use("/blog", require("./routes/blogroutes"))
app.use("/admin",require("./routes/adminroutes"))

app.listen(port, (err) => {
    if (err) {
        console.log("server not started");
    }
    console.log(`server started at http://localhost:${port}`);
})
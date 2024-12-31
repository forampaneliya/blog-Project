const Admin = require("../model/adminmodel");


exports.loginPage=(req, res) => {
    if (req.cookies == undefined || req.cookies.admin == undefined || req.cookies.admin._id == undefined) {
        return res.render("login")
    }
    else{

        return res.redirect("/blog")
    }
}
exports.checkloginn=async (req, res) => {
    let admin = await Admin.findOne({ email: req.body.email });

    if (admin) {
        if (admin.password == req.body.password) {
            console.log("login sucessfully");
            res.cookie("admin", admin)
            return res.redirect("/blog")
        }
        else {
            console.log("incorrect password");
            return res.redirect("/")
        }
    }
    else {
        console.log("User not found");
        return res.redirect("/")

    }

}
exports.logoutt=(req,res)=>{
    res.clearCookie("admin")
    return res.redirect("/")
}

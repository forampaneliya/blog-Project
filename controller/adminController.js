const Admin = require("../model/adminmodel")

exports.signupPage=(req, res) => {
    return res.render("addAdmin")
}
exports.checkSignup=async (req, res) => {
    console.log("File ===> ", req.file);
    let adminn = await Admin.findOne({ email: req.body.email });

    if (!adminn) {
        if (req.body.password == req.body.cpass) {

            let imagepath = "";
            if (req.file) {
                imagepath = `/uploads/admin/${req.file.filename}`
            }
            req.body.adminImage = imagepath;
            console.log(req.body);
            let admin = await Admin.create(req.body)
            if (admin) {
                // res.cookie("admin",admin)
                console.log("register successfully");
                return res.redirect("/")
            }
            else {
                console.log("something wrong");
                return res.redirect("back")

            }
        }
        else {
            // console.log("password & confirm password doesn't match!!");
            return res.redirect("back")
        }
    }
    else {
        console.log("email is alredy exist")
        return res.redirect("/");
    }
}
const express = require("express")
const Admin = require("../model/adminmodel")
const { signupPage, checkSignup } = require("../controller/adminController")
const AdminRoutes = express.Router()

AdminRoutes.get("/",signupPage )
AdminRoutes.post("/addadmin", Admin.uploadAdminImage,checkSignup )

module.exports = AdminRoutes;
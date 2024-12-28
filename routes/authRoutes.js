const express = require("express");
const AuthRoutes = express.Router()
const Admin = require("../model/adminmodel");
const { loginPage, checkloginn, logoutt } = require("../controller/authController");

AuthRoutes.get("/",loginPage )

AuthRoutes.post("/checkLogin", checkloginn)

AuthRoutes.get("/logout",logoutt)

module.exports = AuthRoutes;
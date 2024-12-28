const Blog = require("../model/blogmodel")
const express = require("express")
const path = require("path")
const BlogRoutes = express.Router()
const fs = require("fs")
const Admin = require("../model/adminmodel")
const { viewBlog, addBlogPage, addNewBlog, deleteBlog, editBlogPage, updateBlog, viewSingleBlog } = require("../controller/blogController")

BlogRoutes.get("/",viewBlog)

BlogRoutes.get("/addBlog",addBlogPage )

BlogRoutes.post("/addblog", Blog.uploadBlogImage,addNewBlog )

BlogRoutes.get("/deleteBlog:id", deleteBlog)

BlogRoutes.get("/editBlog:id",editBlogPage )

BlogRoutes.post("/updateBlog/:id", Blog.uploadBlogImage, updateBlog)

BlogRoutes.get("/viewBlog:id",viewSingleBlog)

module.exports = BlogRoutes
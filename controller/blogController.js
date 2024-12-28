const Blog = require("../model/blogmodel")
const path = require("path")
const fs = require("fs")
const Admin = require("../model/adminmodel")

exports.viewBlog = async (req, res) => {
    let record = await Blog.find()
    // console.log(record);
    if (req.cookies == undefined || req.cookies.admin == undefined || req.cookies.admin._id == undefined) {
        return res.redirect("/")
    }
    else {
        let loginAdmin = await Admin.findById(req.cookies.admin._id)

        return res.render("viewBlog", { Blogs: record, loginAdmin })
    }

}

exports.addBlogPage = async (req, res) => {
    if (req.cookies == undefined || req.cookies.admin == undefined || req.cookies.admin._id == undefined) {
        return res.redirect("/")
    }
    else {
        let loginAdmin = await Admin.findById(req.cookies.admin._id)

        return res.render("addBlog", { loginAdmin })
    }
}

exports.addNewBlog = async (req, res) => {

    let imagepath = "";
    if (req.file) {
        imagepath = `/uploads/blog/${req.file.filename}`
    }
    req.body.blogImage = imagepath;
    let cookieAdmin = req.cookies.admin.fname + ' ' + req.cookies.admin.lname
    req.body.author = cookieAdmin
    // console.log(req.body);

    let record = await Blog.create(req.body)
    // console.log(record);

    if (record) {
        console.log("blog add successfully");
        return res.redirect("/blog")

    }
    else {
        console.log("something wrong");
        return res.redirect("back")

    }

}

exports.deleteBlog = async (req, res) => {
    let record = await Blog.findById(req.params.id)
    if (record) {
        let imagePath = path.join(__dirname, "..", record.blogImage)
        fs.unlinkSync(imagePath)
        await Blog.findByIdAndDelete(record)
        console.log("delete sucessfully");
        return res.redirect("/blog")

    }
    else {
        console.log("something wrong");
        return res.redirect("/blog")

    }
}

exports.editBlogPage = async (req, res) => {
    let record = await Blog.findById(req.params.id)
    if (req.cookies == undefined || req.cookies.admin == undefined || req.cookies.admin._id == undefined) {
        return res.redirect("/")
    }
    else {
        if (record) {
            let loginAdmin = await Admin.findById(req.cookies.admin._id)

            return res.render("editBlog", { editblog: record, loginAdmin })
        }
    }

}

exports.updateBlog=async (req, res) => {
    let record = await Blog.findById(req.params.id)
    if (record) {
      if (req.file) {
        let imagePath = record.blogImage;
        if (imagePath != "") {
          imagePath = path.join(__dirname, "..", imagePath);
          try {
            fs.unlinkSync(imagePath);
          } catch (error) {
            console.log("File Missing....");
          }
        }
        let newImagepath = `/uploads/blog/${req.file.filename}`;
        req.body.blogImage = newImagepath
      }
      else {
        req.body.blogImage = record.blogImage
      }
      await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
      console.log("Update Record Success...");
      return res.redirect("/blog")
    }
    else {
      console.log("something wrong");
      return res.redirect("back")
  
    }
  }

  exports.viewSingleBlog= async (req, res) => {
    let record = await Blog.findById(req.params.id)
  
    if (req.cookies == undefined || req.cookies.admin == undefined || req.cookies.admin._id == undefined) {
      return res.redirect("/")
    }
    else {
      let loginAdmin = await Admin.findById(req.cookies.admin._id)
  
      if (record) {
        return res.render("viewSingleBlog", { singleBlog: record, loginAdmin })
      }
      else {
        console.log("something wrong");
        return res.redirect("back")
  
      }
    }
  
  
  }
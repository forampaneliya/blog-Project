const mongoose=require("mongoose");
const multer=require("multer")
const path=require("path")

const blogSchema=mongoose.Schema({
    title:String,
    desc:String,
    date:String,
    category:String,
    blogImage:String,
    author:String
})

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,"..","uploads/blog"))
    },
    filename:(req,file,cb)=>{
        cb(null, file.fieldname + "_" + Date.now())
    }
})
blogSchema.statics.uploadBlogImage=multer({storage}).single("blogImage")

const Blog=mongoose.model("Blog",blogSchema)
module.exports=Blog;
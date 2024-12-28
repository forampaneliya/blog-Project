const mongoose=require("mongoose");
const multer=require("multer")
const path=require("path")

const adminSchema=mongoose.Schema({
    fname:String,
    lname:String,
    email:String,
    password:String,
    cpass:String,
    adminImage:String,
})

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,"..","uploads/admin"))
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"_"+Date.now())
    }
})
adminSchema.statics.uploadAdminImage=multer({storage}).single("adminImage")

const Admin=mongoose.model("Admin",adminSchema)
module.exports=Admin;
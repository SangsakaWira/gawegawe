const user = require("../models/user")
const bcrypt = require("bcryptjs")
const multer = require("multer")

exports.register = (req,res,next) =>{
    user.findOne({$or:[{username:req.body.username},{email:req.body.email}]},(err,doc)=>{
        if(err){
            req.flash("error","Oops Something is Wrong!")
        }else{
            if(doc){
                req.flash("error","User or Email is Already Taken")
            }
        }
    })
}

exports.login = (req,res,next) =>{
    user.findOne({$or:[{username:req.body.username},{email:req.body.email}]},(err,doc)=>{
        if(err){
            req.flash("error","Oops Something is Wrong!")
        }else{
            if(!doc){
               
            }else{
                req.flash("error","User is not found!")
            }
        }
    })
}
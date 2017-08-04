var express=require("express");
var router = express.Router();
var passport = require("passport");
var User  = require("../models/user");

//==================
//  ROOT ROUTE
//==================
router.get("/",function(req,res){
    res.render("home");
});

//=====================
//  SHOW REGISTER FORM
//=====================

//Register
router.get("/register",function(req,res){
    res.render("register");
});

//=============================
//  HANDLE NEW REGISTRATION
//=============================
router.post("/register",function(req,res){
    User.register(new User({username:req.body.username}),req.body.password,function(error,user){
        if(error){
            console.log(error);
            req.flash("error",error.message);
            return res.redirect("/register");
        }
       passport.authenticate("local")(req,res,function(){
          req.flash("success","Welcome to Yelpcamp " + user.username);
           res.redirect("/campgrounds");
       })
    });
});

//==================
//  SHOW LOGIN FORM
//==================
router.get("/login",function(req,res){
    res.render("login");
})


//==================
//  HANDLE LOGIN
//==================
router.post("/login",passport.authenticate("local",
{
    successRedirect: "/campgrounds",
    failureRedirect:"/register"
}),function(req,res){
});


//==================
//  HANDLE LOGOUT
//==================
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","Logged you out!");
    res.redirect("/");
})


//==================
//  EXPORT
//==================
module.exports = router;
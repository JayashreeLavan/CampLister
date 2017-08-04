
var express=require("express");
var router = express.Router({mergeParams:true});
var Campground  = require("../models/campground"),
    Comment     = require("../models/comment");

//===============
// MIDDLEWARE
//===============
var middleware = require("../middleware");

//==================
//  COMMENT NEW
//==================
router.get("/new",middleware.isLoggedIn,function(req, res){
        Campground.findById(req.params.id,function(err, foundCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new",{campground:foundCampground }); 
        }
    });

});


//==================
//  COMMENT CREATE
//==================
router.post("/",middleware.isLoggedIn, function(req, res){
        Campground.findById(req.params.id,function(err, campground){
        if(err){
            console.log(err);
            req.flash("error","Uh oh! Something went wrong");
            res.redirect("/campgrounds");
        }
        else{
        Comment.create(req.body.comment,function(error,comment){
        if(error){
            console.log(error);
        }
        else{
            comment.author.id = req.user._id;
            comment.author.username = req.user.username;
            comment.save();
            campground.comments.push(comment);
            campground.save();
            res.redirect("/campgrounds/"+ campground._id);
            
        } 
    });
        }
    }); 
});


//====================
//  EDIT COMMENT
//====================
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){
    Comment.findById(req.params.comment_id,function(error,foundComment){
        if(error){
            res.redirect("back");
        }
        else{
           res.render("comments/edit",{campground_id:req.params.id,comment:foundComment});   
        }
    });
});

//====================
//  UPDATE COMMENT
//====================
router.put("/:comment_id", middleware.checkCommentOwnership,function(req, res) {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(error,updatedComment){
     if(error){
         res.redirect("back");
     } 
     else{
         res.redirect("/campgrounds/"+ req.params.id);
     }
  });
});     
     

//====================
//  DELETE COMMENT
//====================
router.delete("/:comment_id",middleware.checkCommentOwnership, function(req,res){
   Comment.findByIdAndRemove(req.params.comment_id,function(error){
            if(error){
            console.log(error);
            res.redirect("back"); 
        }
        else{
            res.redirect("back"); 
        }
    });   
 
});

//==================
// EXPORT  
//==================
module.exports = router;
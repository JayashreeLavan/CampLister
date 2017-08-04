var middlewareObject = {};

var Campground  = require("../models/campground"),
    Comment     = require("../models/comment");

middlewareObject.isLoggedIn=function(req,res,next){
            if(req.isAuthenticated()){
            return next();
        }
        req.flash("error","You need to be logged in to do that!");
        res.redirect("/login");
}

middlewareObject.checkAuthorization= function(req,res,next){

        if(req.isAuthenticated()){
        Campground.findById(req.params.id , function(err, foundCampground){
        if(err){
            console.log(err);
            req.flash("error",err.message);
            res.redirect("back");
        }
        else{
            if(foundCampground.author.id.equals(req.user.id)){
              next();   
            }
            else{
                req.flash("error","You dont have permission to do that!");
               res.redirect("back"); 
            }
             
        }
    });        
    }else{
        res.redirect("back");
    }

    
}


middlewareObject.checkCommentOwnership = function(req,res,next){
    if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id , function(error, foundComment){
        if(error){
            console.log(error);
             req.flash("error",error.message);
            res.redirect("back");
        }
        else{
            if(foundComment.author.id.equals(req.user.id)){
              next();   
            }
            else{
                req.flash("error","You dont have permission to do that!");
               res.redirect("back"); 
            }
             
        }
    });        
    }else{
        res.redirect("back");
    }
}


module.exports = middlewareObject;
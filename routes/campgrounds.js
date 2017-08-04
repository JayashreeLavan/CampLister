var express     =require("express");
var router      = express.Router();
var Campground  = require("../models/campground");

//===============
// MIDDLEWARE
//===============
var middleware = require("../middleware");

//===============
// GEOCODER
//===============
var geocoder    = require('geocoder');

//======================
//  INDEX PAGE
//======================
// router.get("/",function(req,res){
//     Campground.find({},function(error,allCampsites){
//   if(error){
//       console.log(error);
//   }  
//   else{
//       console.log(req.user);
//     //   res.render("campgrounds/index",{campgrounds:allCampsites,currentUser:req.user});
//     res.render("campgrounds/index",{campgrounds:allCampsites});
//   }
// });
// });

router.get("/", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }
    });
});

//=====================
//  NEW CAMPGROUND FORM
//=====================
router.get("/new", middleware.isLoggedIn, function(req, res) {
   res.render("campgrounds/new"); 
});

//==============================
//  HANDLE NEW CAMPGROUND ENTRY
//==============================

router.post("/", middleware.isLoggedIn, function(req,res){
  var name = req.body.name;
  var image = req.body.image;
  var price = req.body.price;
  var description = req.body.description;
  var author = {
     id:req.user._id,
     username:req.user.username
  };
  geocoder.geocode(req.body.location, function (err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
   
     
  var newcamp  = {name:name ,price:price, image:image, description:description,author:author,location:location, lat:lat, lng:lng};

    Campground.create(newcamp,function(err,campsite){
        if(err){
            console.log(err);
        }
        else{
            req.flash("success","New campground has been created");
            res.redirect("/campgrounds");
        } 
    });
});
});


// router.post("/", middleware.isLoggedIn, function(req, res){
//   // get data from form and add to campgrounds array
//   var name = req.body.name;
//   var image = req.body.image;
//   var desc = req.body.description;
//   var author = {
//       id: req.user._id,
//       username: req.user.username
//   }
//   var cost = req.body.cost;
//   geocoder.geocode(req.body.location, function (err, data) {
//     var lat = data.results[0].geometry.location.lat;
//     var lng = data.results[0].geometry.location.lng;
//     var location = data.results[0].formatted_address;
//     var newCampground = {name: name, image: image, description: desc, cost: cost, author:author, location: location, lat: lat, lng: lng};
//     // Create a new campground and save to DB
//     Campground.create(newCampground, function(err, newlyCreated){
//         if(err){
//             console.log(err);
//         } else {
//             //redirect back to campgrounds page
//             console.log(newlyCreated);
//             res.redirect("/campgrounds");
//         }
//     });
//   });
// });

//====================
//  SHOW BY ID
//====================
router.get("/:id",function(req, res) {
    
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/show",{campground:foundCampground}); 
        }
    });
});


//====================
//  EDIT CAMPGROUND
//====================
router.get("/:id/edit", middleware.checkAuthorization, function(req, res) {
    Campground.findById(req.params.id , function(err, foundCampground){
        res.render("campgrounds/edit",{campground:foundCampground}); 
    });
});

//====================
//  UPDATE CAMPGROUND
//====================

router.put("/:id", middleware.checkAuthorization, function(req, res) {
    geocoder.geocode(req.body.location, function (err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    
    var newcamp = {name: req.body.name, image: req.body.image,author:req.body.author, description: req.body.description, cost: req.body.cost, location: location, lat: lat, lng: lng};
    // var newcamp  = {name:name ,price:price, image:image, description:description,author:author,location:location, lat:lat, lng:lng};

    // Campground.findByIdAndUpdate(req.params.id, req.body.campground , function(err, updatedCampground){
    Campground.findByIdAndUpdate(req.params.id, {$set: newcamp} , function(err, updatedCampground){
        if(err){
            req.flash("error",err.message);
            res.redirect("/campgrounds");
        }
        else{
          req.flash("success","Update Succesful!");
            res.redirect("/campgrounds/"+ req.params.id); 
        }
    });   

});
});


// router.put("/:id", function(req, res){
//   geocoder.geocode(req.body.location, function (err, data) {
//     var lat = data.results[0].geometry.location.lat;
//     var lng = data.results[0].geometry.location.lng;
//     var location = data.results[0].formatted_address;
//     var newData = {name: req.body.name, image: req.body.image, description: req.body.description, cost: req.body.cost, location: location, lat: lat, lng: lng};
//     Campground.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, campground){
//         if(err){
//             req.flash("error", err.message);
//             res.redirect("back");
//         } else {
//             req.flash("success","Successfully Updated!");
//             res.redirect("/campgrounds/" + campground._id);
//         }
//     });
//   });
// });

//====================
//  DELETE CAMPGROUND
//====================
router.delete("/:id", middleware.checkAuthorization, function(req,res){
        Campground.findByIdAndRemove(req.params.id , function(err){
        if(err){
            console.log(err);
            res.redirect("/campgrounds"); 
        }
        else{
            req.flash("success","Your campground has been removed!");
            res.redirect("/campgrounds"); 
        }
    });
});

//==================
//  EXPORT
//==================
module.exports = router;


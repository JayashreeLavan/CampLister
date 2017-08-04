var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
    name:String,
    price:Number,
    image:String,
    description:String, 

   location: String,
   lat: Number,
   lng: Number,
  
    
    createdAt: {type:Date, default: Date.now},
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username: String
    },
    
    
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
        ]
});

module.exports = mongoose.model("Campground",campgroundSchema);


// var campgrounds = [
//     {name:"Mount Olympus",image:"https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg"},
//     {name:"Living room",image:"https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
//     {name:"Donut falls",image:"https://farm5.staticflickr.com/4153/4835814837_feef6f969b.jpg"},

// ];
       
       
// Campground.create({
//      name:"Mount Olympus",image:"https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg",
//      description: "So breathtaking" 
// },function(err,cat){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(cat);
//     } 
// });

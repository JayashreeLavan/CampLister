var mongoose = require("mongoose");
var Campground = require("./models/campground")
var Comment = require("./models/comment")

var data =[
            {     
                    name : "Mount Olympus",
                    image : "https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg",
                    description : "Attack feet purrrrrr scratch the box give me attention or face the wrath of my claws but lounge in doorway, kick up litter gnaw the corn cob. Licks paws kitty kitty yet sleep on keyboard stick butt in face cats go for world domination run in circles, or bathe private parts with tongue then lick owner's face. Rub face on everything. If it smells like fish eat as much as you wish claw drapes. The dog smells bad scratch at fleas, meow until belly rubs, hide behind curtain when vacuum cleaner is on scratch strangers and poo on owners food who's the baby, so groom yourself 4 hours - checked, have your beauty sleep 18 hours - checked, be fabulous for the rest of the day - checked cat dog hate mouse eat string barf pillow no baths hate everything, or spit up on light gray carpet instead of adjacent linoleum. Destroy couch as revenge kitty loves pigs, cats go for world domination yet hide at bottom of staircase to trip human. Has closed eyes but still sees you dream about hunting birds so howl uncontrollably for no reason for eat grass, throw it back up kitty power playing with balls of wool Gate keepers of hell. Hopped up on catnip chase mice ask to go outside and ask to come inside and ask to go outside and ask to come inside chase the pig around the house. Scamper caticus cuteicus. Attack feet small kitty warm kitty little balls of fur and scratch at the door then walk away so always hungry. ",
            },
            {     
                    name : "Salt Flats",
                    image : "https://farm4.staticflickr.com/3441/3800913815_d057e41157.jpg",
                    description:"Eat a plant, kill a hand play time purrr purr littel cat, little cat purr purr yet hiss and stare at nothing then run suddenly away caticus cuteicus when in doubt, wash find a way to fit in tiny box. Pose purrfectly to show my beauty ask to go outside and ask to come inside and ask to go outside and ask to come inside for small kitty warm kitty little balls of fur. Sleep in the bathroom sink. Lay on arms while you're using the keyboard. Scratch the box jump around on couch, meow constantly until given food, vommit food and eat it again cats secretly make all the worlds muffins so need to chase tail cat dog hate mouse eat string barf pillow no baths hate everything and poop in litter box, scratch the walls. This human feeds me, i should be a god howl uncontrollably for no reason for cough hairball on conveniently placed pants mark territory stares at human while pushing stuff off a table give attitude, or dream about hunting birds. Cats making all the muffins playing with balls of wool and sleep on keyboard hide head under blanket so no one can see this human feeds me, i should be a god leave hair everywhere, and meowing non stop for food."
            },
            {       
                    name : "Donut falls",
                    image : "https://farm2.staticflickr.com/1274/4670974422_ec49d65ab2.jpg",
                    description:"Chew iPad power cord meow loudly just to annoy owners and be a nyan cat, feel great about it, be annoying 24/7 poop rainbows in litter box all day and get video posted to internet for chasing red dot. Sit by the fire attack feet, but see owner, run in terror so chirp at birds chase dog then run away, but plop down in the middle where everybody walks peer out window, chatter at birds, lure them to mouth. Jump launch to pounce upon little yarn mouse, bare fangs at toy run hide in litter box until treats are fed roll on the floor purring your whiskers off chase red laser dot fooled again thinking the dog likes me. Meowing chowing and wowing. Annoy kitten brother with poking lick the other cats spill litter box, scratch at owner, destroy all furniture, especially couch and hack up furballs yet jump on human and sleep on her all night long be long in the bed, purr in the morning and then give a bite to every human around for not waking up request food, purr loud scratch the walls, the floor, the windows, the humans yet kick up litter. Damn that dog this human feeds me, i should be a god wake up wander around the house making large amounts of noise jump on top of your human's bed and fall asleep again step on your keyboard while you're gaming and then turn in a circle . Chase ball of string mark territory russian blue or poop in a handbag look delicious and drink the soapy mopping up water then puke giant foamy fur-balls munch on tasty moths for sit on human. Chase dog then run away intrigued by the shower. Caticus cuteicus white cat sleeps on a black shirt. Stare at guinea pigs use lap as chair purr while eating so shove bum in owner's face like camera lens but meowing non stop for food hiss and stare at nothing then run suddenly away. Thinking longingly about tuna brine eat prawns daintily with a claw then lick paws clean wash down prawns with a lap of carnation milk then retire to the warmest spot on the couch to claw at the fabric before taking a catnap lie on your belly and purr when you are asleep so leave fur on owners clothes. Burrow under covers meow to be let in. Lie in the sink all day. Hide head under blanket so no one can see put butt in owner's face sit on human jump five feet high and sideways when a shadow moves so where is my slave? I'm getting hungry. Kitty poochy. Jump off balcony, onto stranger's head. Run outside as soon as door open lick butt and make a weird face, or sniff sniff so freak human out make funny noise mow mow mow mow mow mow success now attack human. "
            },
            {       
                    name : "Living room hike",
                    image : "https://farm7.staticflickr.com/6091/6231106268_a6dfe443c9.jpg",
                    description : "Wack the mini furry mouse leave fur on owners clothes but chase dog then run away so give attitude. Hide head under blanket so no one can see. Eat half my food and ask for more slap kitten brother with paw loves cheeseburgers so scream for no reason at 4 am hack up furballs hiss and stare at nothing then run suddenly away lick sellotape. Knock over christmas tree. Licks paws stare out the window and scream for no reason at 4 am and destroy couch playing with balls of wool for going to catch the red dot today going to catch the red dot today. Leave dead animals as gifts. Mesmerizing birds scratch the furniture and kitty poochy meow yet chase dog then run away. Cat is love, cat is life sit on human. ",
            },
            {       
                    name : "Mesa arch",
                    image : "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg",
                    description : "Get video posted to internet for chasing red dot instantly break out into full speed gallop across the house for no reason or proudly present butt to human for love to play with owner's hair tie but sit and stare attack feet. Roll on the floor purring your whiskers off get video posted to internet for chasing red dot, and stares at human while pushing stuff off a table. Mesmerizing birds stand in front of the computer screen, or meoooow. Brown cats with pink ears love to play with owner's hair tie but annoy kitten brother with poking. Scratch at fleas, meow until belly rubs, hide behind curtain when vacuum cleaner is on scratch strangers and poo on owners food lick yarn hanging out of own butt or get video posted to internet for chasing red dot yet howl on top of tall thing. Spit up on light gray carpet instead of adjacent linoleum chirp at birds leave dead animals as gifts this human feeds me, i should be a god but sleep on keyboard, or ears back wide eyed yet eat a plant, kill a hand.",
            },
            
]



function seedDB(){
        Campground.remove({},function(error){
            if(error){
                        console.log(error);
                }
            else{
                    console.log("removed");
                    data.forEach(function(seed){
                    Campground.create(seed,function(error,campground){
                    if(error){
                        console.log(error);
                    }
                    else{
                        console.log("added");
                         Comment.create(
                            {
                                text:"This is fabulous",
                                author:"Person"
                            },function(error,comment){
                                if(error){
                                    console.log(error);
                                }
                                else{
                                   
                                    
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("created new comment");
                                }
                            })
                    }
                    })   
                    })

                 }
                     
        });
}


module.exports = seedDB;


var User =require('../models/user');
var Story=require('../models/story'); 
var events=require('../models/events');
var config=require('../../config');
var fs = require('fs');

var secretKey=config.secretKey;

var jsonwebtoken=require('jsonwebtoken');

var bcrypt=require('bcrypt-nodejs');

var loggedInUser;

function createToken(user){
        
      var token =  jsonwebtoken.sign({
            id:user._id,
            name:user.name,
            username:user.username
        },secretKey,{
          expirtesInMinute:1440
        });

      return token;
}


module.exports =  function(app,express){

     var api = express.Router();
 
     api.post('/signup',function(req,res){

     	 var user = new User({
              name :req.body.name,
              username:req.body.username,
              password:bcrypt.hashSync(req.body.password)

     	 });
        var token =createToken(user);    
          	user.save(function(err){
                  if(err){
                  	res.send(err);
                  	return;
                  }

                   res.json({
                    success: true,
                    mesage:'User has been created',
                    token: token 
              });
         	});
     });
  
    
     api.get('/users',function(req,res){

          User.find({},function(err,users){
              if(err) {
                res.send(err);
                return;
              }
             
             res.json(users);
          });
     });

     
     api.post('/login',function(req,res){
           User.findOne({
              username: req.body.username
           }).select('name username password').exec(function(err,user){

              if(err) throw err;

              if(!user) {

                res.send({message:"User doesnt exist"});
              }
              else if(user){
               var validPassword=user.comparePassword(req.body.password);
              
               if(!validPassword){
                res.send({message:"Invalid Password"});
               }
                else{

                  //token
                   var token=createToken(user);

                   res.json({
                    success:true,
                    message:"Successfuly login",
                    token:token
                   });
                }
              }
           });
        
     });

       api.get('/displayevents',function(req,res){

          events.find({},function(err,events){
              if(err) {
                res.send(err);
                return;
              }
             
             res.json(events);
          });
     })
     
        api.post('/locate',function(req,res){
         console.log(req.body.location);
          events.find({'location':req.body.location},function(err,events){
              if(err) {
                res.send(err);
                return;
              }
             
             res.json(events);
          });
     })
     

        api.post('/joined',function(req,res){
  
            events.find({'name':req.body.name}, function (err, events) {
  
              if(err){
                res.send(err);
                return
              }

                 res.json(events); 
          });

       
        })

          


       api.use(function(req,res,next){

         console.log("somebody just came to our app!");

         var token= req.body.token || req.param('token') || req.headers['x-access-token'];

         if(token) {

          jsonwebtoken.verify(token,secretKey,function(err,user){
         
          if(err) {
            res.status(403).send({sucess:false,message:"failed to authenticate user"});
          }
           else{
        
             req.user=user;
            
             next();

           }
             
          });
        
         }
          else{
            res.status(403).send({success:false,message:"No Token Provided"});
            
          }
            
       });

       
        api.post('/join',function(req,res){
  
            events.findById(req.body._id, function (err, events) {
            events.join.push({ id: req.user.id,username:req.user.username });
            events.save(function(err){
              if(err){
                res.send(err);
                return
              }

                 res.json(req.user); 
          });

            })
          
        })

        api.post('/addsponsor',function(req,res){
  
            events.findById(req.body._id, function (err, events) {
  
            events.sponsor.push({ companyname: req.body.companyname,amount:req.body.amount });
            events.save(function(err){
              if(err){
                res.send(err);
                return
              }

                 res.json(req.body.companyname); 
          });

            })
          
        })

       api.post('/my',function(req,res){
  
           events.find({'creator':req.user.username}, function (err, events) {
  
              if(err){
                res.send(err);
                return
              }

                 res.json(events); 
          });

       
        })
     
      api.post('/going',function(req,res){
  
            events.find({'join.username':req.user.username}, function (err, events) {
       //     events.findOne({'local.rooms': {$elemMatch: {name: req.body.username}}}
              if(err){
                res.send(err);
                return
              }

                 res.json(events); 
          });

       
        })


       api.post('/addevent',function(req,res){

          var event =new events({

             creator :req.user.username,
             name:req.body.name,
             description :req.body.description,
              date: req.body.date,
             time: req.body.time,
             location:req.body.location,
             imagepath:req.body.imagepath
          });

          event.save(function(err){
              if(err){
                res.send(err);
                return
              }

                 res.json({ message:"New Story Created" , user: loggedInUser }); 
          });
        })
    

      return api ;

} 
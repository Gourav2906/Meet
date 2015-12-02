var mongoose =require('mongoose');

var Schema = mongoose.Schema;

var events =new Schema ({

	 // creator :{type :Schema.Types.ObjectId ,ref :'User'},
	 
	 creator:String,
	 name:String,
	 description :String,
	 date: {type:Date, default:Date.now},
     time:String,
     location:String,
     join:Array,
     interested:Array,
     sponsor:Array ,
     imagepath: String 
});


module.exports = mongoose.model('events',events);
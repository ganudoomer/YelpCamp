var mongoose=require("mongoose");
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

var passportLocalMongoose = require("passport-local-mongoose");


var UserSchema=new mongoose.Schema({
    name:String,
    password:String
});
UserSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("User",UserSchema);
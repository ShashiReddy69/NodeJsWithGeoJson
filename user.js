//Model/user.js
// userModel
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:Number,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
     street:{
        type:String,
        required:true
     },
     locality:{
        type:String,
        required:true
     },
     city:{
        type:String,
        required:true
     },
     state:{
        type:String,
        required:true
     },
     pincode:{
        type:Number,
        required:true
    },
     CoordinatesType:{
         type:{ type:String ,default:"Point"},
        //type:String,
        coordinates:{
           type:[Number],
           index:"2dsphere"
        },
    }
   }
    // coordinates:{
    //     type:Number,
    //     required:true
    // }
},{timestamps:true})
module.exports=mongoose.model('usersData',userSchema)
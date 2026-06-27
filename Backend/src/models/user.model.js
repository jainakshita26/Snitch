import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema =new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    contact:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:function(){
            return !this.googleId     //if googleId exist then no need of password else needed
        },
    },
    fullname:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['buyer','seller'],
        default:'buyer'
    },
    googleId:{
        type:String,          //required not true beacuse may be sometime user login with normal method so there will be no googleId
    }
})

userSchema.pre("save",async function(){
    if(!this.isModified("password")) return 

    const hash=await bcrypt.hash(this.password,10)
    this.password=hash
})

userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password)
}

const userModel=mongoose.model('user',userSchema)

export default userModel;
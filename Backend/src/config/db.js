import mongoose from "mongoose";
import {config} from './config.js'

const connectToDb=async ()=>{
    await mongoose.connect(config.MONGO_URI)
    console.log("MongoDB connected")
}

export default connectToDb
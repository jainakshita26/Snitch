import dotenv from 'dotenv'
dotenv.config()     //here we are defining this so that can use environmental variable inside only this 

if(!process.env.MONGO_URI){
    throw new Error("MONGO_URI is not defined in environment variables")
}

if(!process.env.JWT_SECRET){
    throw new Error("JWT_SECRET is not defined in environment variables")
}

export const config={
    MONGO_URI:process.env.MONGO_URI,
    JWT_SECRET:process.env.JWT_SECRET
}
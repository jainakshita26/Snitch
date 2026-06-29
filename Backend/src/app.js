import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import authRouter from './routes/auth.routes.js'
import cors from 'cors'
import passport from "passport"
import {Strategy as GoogleStrategy} from "passport-google-oauth20"
import { config } from './config/config.js'
import productRouter from './routes/product.routes.js'

const app=express()

app.use(morgan("dev"))
app.use(express.json())      //when frontend send json
app.use(express.urlencoded({extended:true}))    //when frontend send form data
app.use(cookieParser())
// app.use(cors({
//     origin:"http://localhost:5173",
//     methods:["GET","POST","PUT","DELETE"],
//     credentials:true
// }))
app.use(passport.initialize())

passport.use(new GoogleStrategy({
    clientID:config.GOOGLE_CLIENT_ID,
    clientSecret:config.GOOGLE_CLIENT_SECRET,
    callbackURL:"/api/auth/google/callback"
},(accessToken,refreshToken,profile,done)=>{
    return done(null,profile)            //profile contains the user's Google information.
}))

app.get('/',(req,res)=>{
    res.status(200).json({message:"Server is running"})
})



app.use('/api/auth',authRouter)
app.use('/api/products',productRouter)
export default app;
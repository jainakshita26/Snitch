import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import authRouter from './routes/auth.routes.js'

const app=express()

app.use(morgan("dev"))
app.use(express.json())      //when frontend send json
app.use(express.urlencoded({extended:true}))    //when frontend sand form data
app.use(cookieParser())

app.get('/',(req,res)=>{
    res.status(200).json({message:"Server is running"})
})



app.use('/api/auth',authRouter)
export default app;
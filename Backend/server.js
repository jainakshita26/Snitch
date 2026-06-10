import dotenv from 'dotenv'
import app from './src/app.js'
import connectToDb from './src/config/db.js'

dotenv.config()

const PORT =process.env.PORT || 8000

const startServer= async ()=>{
    try{
        await connectToDb()

        app.listen(PORT,()=>{
            console.log(`Server is running on port ${PORT}`)
        })
    }catch(error){
        console.log("Failed to start server:",error.message);
        process.exit(1);
    }
}

startServer()


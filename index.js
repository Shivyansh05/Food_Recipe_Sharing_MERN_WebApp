import express from "express";
import mongoose from "mongoose";
import bodyParser from 'express'
import userRouter from './routes/user.js'
import recipeRouter from './routes/recipe.js'
import cors from 'cors'
import dotenv from 'dotenv'
const app = express(); 
dotenv.config()
const PORT =process.env.PORT;
app.use(bodyParser.json())
app.use(cors({
  origin:true,
  methods:["GET","POST","PUT","DELETE"],
  credentials:true
 
}))

// userRouter
app.use('/api',userRouter)

// recipeRouter
app.use('/api',recipeRouter)

mongoose
  .connect(process.env.MONGO_URL,
    {
      dbName: "Food_Recipe_MERN_App",
    }
  )
  .then(() => console.log("MongoDB is Connected..!"))
  .catch((err) => console.log(err.message));

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));

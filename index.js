import express from 'express'
import 'dotenv/config'
import { MongoClient } from 'mongodb';


const PORT = process.env.PORT || 8000;
const app = express();


async function connectDB() {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    console.log("Mongo db connected succesfully ");
    return client
  } catch(error){
    console.log(error)
  }
}

await connectDB();




app.listen(PORT,()=>{
    console.log(`Sever is running at port ${PORT}`)
})
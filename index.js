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

const client = await connectDB();
const db = client.db("booknookdb");
const allbookCollection = db.collection("allbooks");
const categoriesCollection = db.collection("categoriesName")


app.get('/api/all-books',async (req,res)=>{
    const data = await allbookCollection.find({}).toArray();
    res.send(data);
})

app.get('/api/categories',async(req,res)=>{
    const data = await categoriesCollection.find({}).toArray();
    res.send(data);
})


app.listen(PORT,()=>{
    console.log(`Sever is running at port ${PORT}`)
})
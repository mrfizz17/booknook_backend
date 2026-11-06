import express from 'express'
import 'dotenv/config'
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors'

const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors());
app.use(express.json())

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

app.get('/api/new-arrival',async(req,res)=>{
    const data = await allbookCollection.find().sort({_id:-1}).limit(6).toArray();
    res.send(data);
})

app.get('/api/all-books/:id',async (req,res)=>{
    const id = req.params.id;
    const data = await allbookCollection.findOne({_id:new ObjectId(id)});
    res.send(data);
})


app.post("/api/add-books",async (req,res)=>{
    const data = await req.body;
    console.log(data)

    const result = await allbookCollection.insertOne(data);
    res.send(result);
})

app.get("/api/my-books/:email",async (req,res)=>{
    const {email} = await req.params;

    console.log(email)

    const books = await allbookCollection.find({
        userEmail:email
    }).toArray()

    console.log(books);
    res.send(books)
})


app.patch("/api/my-books/update/:id",async(req,res)=>{
    const {id}=  req.params
    const updateData = req.body

    const data = await allbookCollection.updateOne(
        {_id:new ObjectId(id)},
        {$set: updateData}
    )

    res.send(data);
})

app.listen(PORT,()=>{
    console.log(`Sever is running at port ${PORT}`)
})
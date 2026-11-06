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
const borrowCollection = db.collection("borrow")

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

app.delete("/api/my-books/delete/:id",async(req,res)=>{
    const {id} = req.params;
    
    const result = await allbookCollection.deleteOne(
        {_id:new ObjectId(id)}
    )

    res.send(result);

})


app.post("/api/my-books/borrow/:id",async(req,res)=>{
    const {id} = req.params;
    const data = req.body
    
    const result = await allbookCollection.findOne(
        {_id:new ObjectId(id),
         count : {$gt:0}
        }
    )

    const borrowed = await borrowCollection.findOne({
        BorrowedUserEmail:data.BorrowedUserEmail,
        title:data.title
    })

    if(borrowed){
        res.send({
            msg : 'You have already borrowed this book ! '
        });
        return;
    }

    
    if(result){
        const response = await borrowCollection.insertOne(data);
        const response2= await allbookCollection.updateOne(
            {_id:new ObjectId(id)},
            {$inc : {count :-1}}
        )
        res.send({msg: 'Borrowed Succesfully' ,response,response2});

        return;
    };
    
    res.send({
        msg:' All Copies are borrowed'
    })

 

})

app.get("/api/my-borrowed/:email",async(req,res)=>{
    const {email } = req.params;

    const result = await borrowCollection.find({
        BorrowedUserEmail:email
    }).toArray()

    res.send(result);
})

app.delete("/api/my-borrows/delete/:id/:email",async(req,res)=>{
    const {id,email} = req.params;

    const result2 = await borrowCollection.findOne({
        _id:new ObjectId(id)
    })

    // console.log(result2)

    const updateAllBook = await allbookCollection.updateOne(
        {_id: new ObjectId(result2.OldId)},
        {$inc: {count: +1}}
    )

    const result= await borrowCollection.deleteOne(
        {_id:new ObjectId(id),
          BorrowedUserEmail:email
        }
    )

    

    res.send({msg:'You Returned Book Succesfully',result,updateAllBook});

})

app.listen(PORT,()=>{
    console.log(`Sever is running at port ${PORT}`)
})
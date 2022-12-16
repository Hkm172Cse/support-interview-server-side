const {MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
const express = require('express');
const port = process.env.PORT ||  5000;
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://suprem_support:77DDAcQl7zkWKQDh@cluster0.miklgww.mongodb.net/?retryWrites=true&w=majority`;
const suprem_support_db = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {

        const client_data = await suprem_support_db.db('suprem_interview').collection('client_data'); 
        
        app.post('/add_data', async(req,res)=>{
            const getData = req.body;
            console.log(req.body);
            const result = await client_data.insertOne(getData);
            res.send(result);
        });

        app.get('/get_data', async (req, res) => {
            const result = await client_data.find({}).toArray();
            res.send(result);
        });

        app.delete('/delete_data/:id', async(req,res)=>{
            const id = req.params.id;
            console.log(id);
            const query = { _id: ObjectId(id) };
            const result = await client_data.deleteOne(query);
            res.send(result);
        });

        app.get('/getforedit/:id', async(req,res)=>{
           const id = req.params.id;
           console.log(id);
           const query = {_id:ObjectId(id)};
           const result = await client_data.findOne(query);
           res.send(result); 
        });

        app.put('/updateInfo/:id', async(req,res)=>{
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const editData = req.body;
            const option = { upsert: true };
            const updateData = {
                $set: {
                    id: editData.id,
                    title: editData.title,
                    address:editData.address,
                    sub:editData.sub,
                    state:editData.state,
                    zip:editData.zip,
                    let_value:editData.let_value,
                    long_value:editData.long_value
                }
            }
            const result = await Client_data.updateOne(filter, updateData, option);
            console.log(result);
            res.send(result);
        });

    }
    finally {

    }
}

run().catch(e => console.log(e));

app.get('/', (req,res)=>{
    res.send(`servier is runing on the ${port} number port`);
});


app.listen(port,(res,req)=>{
    console.log(`sever is running on port ${port}`);
});

///username: suprem_support
/// password: 77DDAcQl7zkWKQDh

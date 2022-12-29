const express = require('express')
const cors = require('cors');
const {
    MongoClient,
    ServerApiVersion,
    ObjectId
} = require('mongodb');
require('dotenv').config();

const app = express()
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.nl9uncn.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


async function run() {
    try {
        const myTaskCollection = client.db("taskManagerServer").collection("myTask");
        const completeTaskCollection = client.db("taskManagerServer").collection("completeTask");


        app.get('/task', async (req, res) => {
            const query = {}
            const cursor = myTaskCollection.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })

        app.post('/task', async (req, res) => {
            const order = req.body;
            const result = await myTaskCollection.insertOne(order)
            res.send(result)
        })

        app.post('/completeTask', async (req, res) => {
            const order = req.body;
            const result = await completeTaskCollection.insertOne(order)
            res.send(result)
            console.log(result);
        })

        app.get('/myTask', async (req, res) => {
            let query = {}
            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }
            const cursor = myTaskCollection.find(query)
            const mytask = await cursor.toArray()
            res.send(mytask)
        })

        app.get('/myCompleteTask', async (req, res) => {
            let query = {}
            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }
            const cursor = completeTaskCollection.find(query)
            const mytask = await cursor.toArray()
            res.send(mytask)
        })

        app.delete('/myTask/:id', async (req, res) => {
            const id = req.params.id;
            const query = {
                _id: ObjectId(id)
            }
            const result = await myTaskCollection.deleteOne(query)
            res.send(result)
        })
        app.delete('/myCompleteTask/:id', async (req, res) => {
            const id = req.params.id;
            const query = {
                _id: ObjectId(id)
            }
            const result = await completeTaskCollection.deleteOne(query)
            res.send(result)
        })


    } finally {

    }
}
run().catch(error => console.error(error))

















app.get('/', (req, res) => {
    res.send('task manager server is running')
})

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})
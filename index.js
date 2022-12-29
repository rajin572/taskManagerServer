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
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


// async function run() {
//     try {
//         const serviceCollection = client.db("taskManagerServer").collection("services");
//         const reviewCollection = client.db("upturn").collection("reviews");


//     } finally {

//     }
// }
// run().catch(error => console.error(error))

















app.get('/', (req, res) => {
    res.send('task manager server is running')
})

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})
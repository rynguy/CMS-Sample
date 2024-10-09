//App.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { MongoClient, ServerApiVersion } = require('mongodb');
const credentials = process.env.MONGO_CERT_PATH //'C:\Users\evely\Downloads\Ryan\CMS-Sample\certs\X509-cert-5235354515774237258.pem'
const client = new MongoClient('mongodb+srv://cluster0.umt0a.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority&appName=Cluster0', {
    tlsCertificateKeyFile: credentials,
    serverApi: ServerApiVersion.v1
  });
  /* //check cert path
  const resolvedPath = path.resolve(credentials);
  console.log(`Resolved Certificate Path: ${resolvedPath}`);
*/

  async function run() {
    try {
      await client.connect();
      const database = client.db("testDB");
      const collection = database.collection("testCol");
      const docCount = await collection.countDocuments({});
      console.log(docCount);
      console.log("MongoDB Connected Successfully.");
      // perform actions using client
    } catch (err) {
      console.error("Database Connection failed. Error details:", err);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
 // run().catch(console.dir);
  //  run().catch(err => {
   //     console.log("Database Connection failed.");
  //  })
  

const app = express();

/* Configure Mongoose to connect to MongoDB 
mongoose.connect(
    'mongodb+srv://cluster0.umt0a.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority&appName=Cluster0',
     options).then(() => console.log('Connected to MongoDB with SSL!'))
     .catch(err => console.error('Connection error:', err));
*/

/* Configure express*/
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

/* Routes */
app.use('/',(req, res) => {   // '/'  indicates root folder of the page
    res.send('Welcone to the CMS app3');
});



app.listen(3000, ()=>{
    console.log(`Server is running on port 3000`)
});
run().catch(err => {
    console.log("Connection Error", err);
})
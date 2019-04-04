// const MongoClient = require('mongodb').MongoClient;

// // replace the uri string with your connection string.
// const uri = "mongodb+srv://chandru:chanMongoDB%4020@cluster0-k2bgr.mongodb.net/test?retryWrites=true"
// MongoClient.connect(uri, function (err, client) {
//     if (err) {
//         console.log('Error occurred while connecting to MongoDB Atlas...\n', err);
//         return
//     }
//     console.log('Connected...');
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
// });




const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://chandru:chanMongoDB%4020@cluster0-k2bgr.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});

import { MongoClient } from 'mongodb';

// Replace with your Atlas connection string
const uri = "mongodb+srv://deeptimayeep348:wyMunYVljNXPbeID@cluster0.gfeq99b.mongodb.net/test?retryWrites=true&w=majority";

// Create a new MongoClient
const client = new MongoClient(uri);

async function connect() {
  try {
    // Connect to the MongoDB Atlas cluster
    await client.connect();
    console.log("Connected to MongoDB Atlas!");

    // Access a database (replace 'test' with your DB name if needed)
    const db = client.db('test');
    // You can now perform operations on 'db'
  } catch (err) {
    console.error(err);
  } finally {
    // Close the connection
    await client.close();
  }
}

connect();
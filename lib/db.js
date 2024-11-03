import { PrismaClient } from "@prisma/client";

const db = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

export default db;


// lib/mongodb.js
// import { MongoClient } from 'mongodb';

// const uri = 'mongodb://localhost:27017/inventoryDB'; // Replace with your MongoDB URI if needed
// const options = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// };

// let client;
// let clientPromise;

// if (process.env.NODE_ENV === 'development') {
//     // In development mode, use a global variable to hold the MongoClient
//     if (!global._mongoClientPromise) {
//         client = new MongoClient(uri, options);
//         global._mongoClientPromise = client.connect();
//     }
//     clientPromise = global._mongoClientPromise;
// } else {
//     // In production mode, it's safe to connect directly
//     client = new MongoClient(uri, options);
//     clientPromise = client.connect();
// }

// export default clientPromise;

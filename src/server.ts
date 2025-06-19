import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

require('dotenv').config();

let server: Server;
let port = 5000;

async function main() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.cy3cu.mongodb.net/library-management-mongoose?retryWrites=true&w=majority&appName=Cluster0`);
        console.log("Successfully connected to MongoDB");
        server = app.listen(port, () => {
            console.log(`App is running on port ${port}`);
        })

    } catch(error) {
        console.log(error);
    }
}

main();
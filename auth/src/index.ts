import mongoose from "mongoose";

import { app } from "./app";

const start = async () => {
    console.log("Staring uppp");
    if (!process.env.JWT_KEY) {
        throw new Error("JWT_KEY must be defined");
    }
    if (!process.env.AUTH_MONGO_URI) {
        throw new Error("AUTH_MONGO_URI must be defined");
    }

    try {
        await mongoose.connect(`${process.env.AUTH_MONGO_URI}`);
        console.log('Connected to auth mongodb...');

    } catch (err) {
        console.error(err);
    }

    app.listen(3000, () => {
        console.log("Listening on PORT 3000!!!!!");
    });
}

start();
import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI , {
        dbName: "TodoBackend"
    })
    .then(() => console.log("Database is connected"))
    .catch((e) => console.log(e));
}
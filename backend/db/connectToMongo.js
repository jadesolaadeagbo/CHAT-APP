import mongoose from "mongoose";

const connectToMongo = async () => {
    try{
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected to MONGO DB")
    } catch(error){
        console.log("Error connecting to Mongo DB", error.message)
    }
}

export default connectToMongo;
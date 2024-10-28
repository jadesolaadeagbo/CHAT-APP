import express from "express"
import dotenv from "dotenv";
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'

import connectToMongo from "./db/connectToMongo.js"
import cookieParser from "cookie-parser";

const app  = express();
const PORT = process.env.PORT || 8080;

dotenv.config();

// Your json middleware should always come before your routes
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// app.get("/", (req, res) => {
//     res.send("Hello World")
// })


app.listen(PORT, () => {
    connectToMongo();
    console.log(`Server running on port ${process.env.PORT}`)
});
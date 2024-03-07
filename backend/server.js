import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"

dotenv.config();
connectDB()
const port = process.env.PORT || 8080;
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())


console.log(process.env.PORT)
app.get("/", (request, response) => {
  response.send("API is running");
});

app.use('/api/products', productRoutes)
app.use("/api/users", userRoutes)

app.use(notFound)
app.use(errorHandler)



app.listen(port, () => console.log(`server is running on port ${port}`));

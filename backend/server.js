import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

import productRoutes from "./routes/productRoutes.js"

dotenv.config();
connectDB()

const app = express();
const port = process.env.PORT || 8080;

console.log(process.env.PORT)
app.get("/", (request, response) => {
  response.send("API is running");
});

app.use('/api/products', productRoutes)

app.use(notFound)
app.use(errorHandler)



app.listen(port, () => console.log(`server is running on port ${port}`));

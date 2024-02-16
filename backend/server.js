import express from "express";
import dotenv from "dotenv";

import products from "./data/products.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
app.get("/", (request, response) => {
  response.send("API is running");
});

//get all products
app.get("/api/products", (request, response) => {
  response.json(products);
});

//get singleProduct

app.get("/api/products/:id", (request, response) => {
  const product = products.find((p) => p._id === request.params.id);
  response.json(product);
});

app.listen(port, () => console.log(`server is running on port ${port}`));

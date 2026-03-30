import express from "express";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

const app = express();

app.use(express.json()); // allows us to accept the json data in the req.body

app.post("/api/products", async (req, res) => {
  const product = req.body; // this is what the use will send

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.log("Error in Create Product: ", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.listen(5000, () => {
  connectDB();
  console.log("Server started at http://localhost:5000");
});

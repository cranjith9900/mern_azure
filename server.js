require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database is connected..."))
  .catch((err) => console.error("MongoDB connection error:", err));

// DB schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
});

// DB model
const User = mongoose.model("User", userSchema);

// Routes
app.get("/get-users", async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/create", async (req, res) => {
  try {
    const { name, lastName } = req.body;

    if (!name || !lastName) {
      return res.status(400).json({ error: "name and lastName are required" });
    }

    const newUser = new User({ name, lastName });
    await newUser.save();

    return res.json({ message: "User created successfully", user: newUser });
  } catch (err) {
    console.error("Error creating user:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Health check route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Serve React build in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const app = express();


// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// Basic Route
app.get("/", (req, res) => {
  res.send("BookMyDoctor API Running");
});

// Routes will be added here
// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use("/api/users", userRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

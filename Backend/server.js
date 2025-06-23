require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/authRoutes")
// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/v1/auth", authRoutes);
// app.use("/api/users", userRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname, "../Frontend")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const userRoutes = require("./routes/userRoutes");
// const path = require("path");
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Static files
// app.use(express.static(path.join(__dirname, 'BookMyDoctor-Frontend')));

// // Database Connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.error(err));

// // Basic Route
// app.get("/", (req, res) => {
//   res.send("BookMyDoctor API Running");
// });

// // Routes will be added here
// // Routes
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use("/api/users", userRoutes);

// const PORT = process.env.PORT || 5000;

// // Serve frontend for root route
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "BookMyDoctor-Frontend", "index.html"));
// });

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

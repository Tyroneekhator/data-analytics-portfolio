const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

// Load environment variables from the .env file.
dotenv.config();

// Create the Express application.
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// Enable Cross-Origin Resource Sharing (CORS) for all origins.
// This allows your frontend to make API calls to the backend.
app.use(cors());
// Parse incoming JSON requests.
app.use(express.json());

// Database Connection
// Connect to your MongoDB Atlas database using the MONGO_URI from your .env file.
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully."))
  .catch((err) => console.error("MongoDB connection error:", err));

// Import the API routes for your projects.
const projectRoutes = require("./routes/projectRoutes");

// Use the project routes for any requests that start with '/api'.
app.use("/api", projectRoutes);

// Serve Static Assets in Production
// If the application is in production mode, serve the static files from the build folder.
if (process.env.NODE_ENV === "production") {
  // Serve any static files from the 'build' directory.
  app.use(express.static(path.join(__dirname, "../build")));

  // For any request that doesn't match an API route, send back the index.html file.
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../build", "index.html"));
  });
}

// Start the server and listen for incoming requests.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const mongoose = require("mongoose");

// Define the schema for a Project document in MongoDB.
// This schema dictates the structure of the data we will store for each project.
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: String,
  technologies: [String],
  githubUrl: String,
  liveDemoUrl: String,
});

// Create a Mongoose model from the schema.
const Project = mongoose.model("Project", projectSchema);

// Export the model for use in other parts of the application.
module.exports = Project;

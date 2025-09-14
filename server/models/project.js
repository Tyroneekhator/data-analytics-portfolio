const mongoose = require("mongoose");

// Define the schema for a Project.
// A schema defines the structure of the documents within a collection.
const projectSchema = new mongoose.Schema({
  // The title of the project. It's a required string.
  title: {
    type: String,
    required: true,
  },
  // A brief description of the project.
  description: {
    type: String,
    required: true,
  },
  // The URL for the project's image. It's optional.
  imageUrl: {
    type: String,
  },
  // An array of strings for the technologies or skills used.
  skills: {
    type: [String],
    required: true,
  },
  // The URL for the project's GitHub repository. It's optional.
  githubUrl: {
    type: String,
  },
});

// Create and export the Mongoose model for the 'Project' collection.
// The model provides a high-level API for database operations.
const Project = mongoose.model("Project", projectSchema);

module.exports = Project;

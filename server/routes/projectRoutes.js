const express = require("express");
// The Router allows you to group related route handlers and middleware.
const router = express.Router();

// Import the controller that contains the actual logic for handling requests.
const projectController = require("../controllers/projectController");

// Define API routes for projects.

// Route to get all projects or create a new one.
// The controller functions are attached to these routes to handle the requests.
router
  .route("/projects")
  .get(projectController.getProjects)
  .post(projectController.createProject);

// Routes for a specific project by its ID.
router
  .route("/projects/:id")
  .get(projectController.getProject)
  .put(projectController.updateProject)
  .delete(projectController.deleteProject);

// Export the router to be used by the main server file.
module.exports = router;

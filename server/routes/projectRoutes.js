const express = require("express");
const router = express.Router();
const Project = require("../models/Project"); // Import the Project model

// Create a few initial projects to display when the server starts.
// This is a simple way to "seed" the database for a demonstration.
async function seedProjects() {
  const existingProjects = await Project.countDocuments();
  if (existingProjects === 0) {
    const projects = [
      {
        title: "Sales Performance Dashboard",
        description:
          "Created an interactive dashboard using Tableau to visualize sales data, identify key trends, and track performance metrics. Enabled stakeholders to make data-driven decisions.",
        imageUrl: "https://placehold.co/600x400/e5e7eb/374151?text=Project+1",
        technologies: ["Tableau", "SQL", "Data Visualization"],
        githubUrl: "https://github.com/your-username/sales-dashboard",
        liveDemoUrl: "#",
      },
      {
        title: "Customer Churn Prediction",
        description:
          "Developed a machine learning model with Python and Scikit-learn to predict customer churn. The project included data preprocessing, feature engineering, and model evaluation.",
        imageUrl: "https://placehold.co/600x400/e5e7eb/374151?text=Project+2",
        technologies: ["Python", "Scikit-learn", "Pandas", "Machine Learning"],
        githubUrl: "https://github.com/your-username/churn-prediction",
        liveDemoUrl: "#",
      },
      {
        title: "SQL Data Cleaning Pipeline",
        description:
          "Designed and implemented a robust SQL script to clean and transform raw customer data. The pipeline standardized formats, removed duplicates, and handled missing values, improving data integrity.",
        imageUrl: "https://placehold.co/600x400/e5e7eb/374151?text=Project+3",
        technologies: ["SQL", "Data Cleaning", "ETL"],
        githubUrl: "https://github.com/your-username/sql-pipeline",
        liveDemoUrl: "#",
      },
    ];
    await Project.insertMany(projects);
    console.log("Database seeded with initial projects!");
  }
}
seedProjects();

// GET all projects. This is the endpoint your frontend is calling.
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new project
router.post("/", async (req, res) => {
  const project = new Project(req.body);
  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (update) a project by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProject)
      return res.status(404).json({ message: "Project not found" });
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a project by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject)
      return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

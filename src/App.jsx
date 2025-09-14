import { useState, useEffect } from "react";
import {
  Lightbulb,
  Briefcase,
  Github,
  Linkedin,
  ExternalLink,
} from "lucide-react";

const API_BASE_URL = "http://localhost:5000/api";

const App = () => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/projects`);
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      const data = await response.json();
      setProjects(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError(
        "Error fetching projects. Please ensure the server is running on http://localhost:5000."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProject = async (projectData) => {
    console.log("Attempting to save project with data:", projectData);
    try {
      const url = editingProject
        ? `${API_BASE_URL}/projects/${editingProject._id}`
        : `${API_BASE_URL}/projects`;
      const method = editingProject ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          "Server response was not ok:",
          response.status,
          errorText
        );
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Project saved successfully:", data);
      await fetchProjects();
      setEditingProject(null);
      setShowForm(false);
    } catch (err) {
      console.error("Error saving project:", err);
      setError(
        "Error saving project. Please ensure the server is running and the database is accessible."
      );
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      await fetchProjects();
    } catch (err) {
      console.error("Error deleting project:", err);
      setError("Error deleting project. Please try again.");
    }
  };

  const ProjectCard = ({ project, isAdmin, onEdit, onDelete }) => (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700 hover:shadow-2xl transition-shadow duration-300 relative">
      {isAdmin && (
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={() => onEdit(project)}
            className="bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 transition"
            title="Edit Project"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-edit-2"
            >
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              <path d="m15 5 4 4" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(project._id)}
            className="bg-red-600 text-white p-2 rounded-full shadow-md hover:bg-red-700 transition"
            title="Delete Project"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-trash-2"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              <line x1="10" x2="10" y1="11" y2="17" />
              <line x1="14" x2="14" y1="11" y2="17" />
            </svg>
          </button>
        </div>
      )}
      <img
        src={
          project.imageUrl ||
          `https://placehold.co/400x250/1d4ed8/ffffff?text=Project`
        }
        alt={project.title}
        className="w-full h-48 object-cover rounded-xl"
      />
      <h3 className="mt-4 text-2xl font-semibold text-gray-100">
        {project.title}
      </h3>
      <p className="mt-2 text-gray-300 text-sm">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.skills?.map((skill, index) => (
          <span
            key={index}
            className="bg-slate-700 text-gray-200 px-3 py-1 rounded-full text-xs font-medium"
          >
            {skill}
          </span>
        ))}
      </div>
      {project.githubUrl && (
        <div className="mt-6">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-full font-semibold shadow-md hover:bg-blue-700 transition"
          >
            <Github className="w-4 h-4 mr-2" />
            GitHub Repo
          </a>
        </div>
      )}
    </div>
  );

  const ProjectForm = ({ project, onSave, onClose }) => {
    const [formData, setFormData] = useState({
      title: project?.title || "",
      description: project?.description || "",
      imageUrl: project?.imageUrl || "",
      skills: project?.skills?.join(", ") || "",
      githubUrl: project?.githubUrl || "",
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const newProject = {
        ...formData,
        skills: formData.skills
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s),
      };
      onSave(newProject);
    };

    return (
      <div className="fixed inset-0 bg-slate-950 bg-opacity-70 flex items-center justify-center p-4 z-50">
        <div className="bg-slate-800 text-gray-100 p-6 rounded-2xl shadow-xl w-full max-w-lg">
          <div className="flex justify-between items-center border-b border-slate-700 pb-3 mb-4">
            <h2 className="text-2xl font-bold text-gray-100">
              {project ? "Edit Project" : "Add New Project"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-600 bg-slate-700 text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="3"
                className="mt-1 block w-full rounded-md border-gray-600 bg-slate-700 text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Image URL
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-600 bg-slate-700 text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">
                GitHub URL
              </label>
              <input
                type="url"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-600 bg-slate-700 text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Skills (comma-separated)
              </label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-600 bg-slate-700 text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-700 transition"
              >
                Save Project
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const isAdmin = window.location.search === "?admin";

  return (
    <div className="bg-slate-950 min-h-screen font-sans antialiased text-gray-200">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-blue-400 sm:text-6xl">
            Elias Khathutshelo
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Passionate Data Analyst & Developer
          </p>
        </header>

        {/* Hero Section */}
        <section className="bg-slate-800 p-8 rounded-3xl shadow-xl border border-slate-700 mb-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 md:pr-8">
              <h2 className="text-3xl font-bold text-gray-100">About Me</h2>
              <p className="mt-4 text-gray-300 leading-relaxed">
                I am a highly motivated and skilled data analyst with a strong
                background in extracting insights from complex datasets. My
                expertise lies in using Python, SQL, and data visualization
                tools to translate data into actionable business strategies. I
                have a proven track record of developing end-to-end data
                solutions, from data collection and cleaning to analysis and
                dashboard creation. I'm always eager to learn and apply new
                technologies to solve real-world problems.
              </p>
              <div className="mt-6 flex space-x-4">
                <a
                  href="#"
                  className="flex items-center text-blue-400 hover:text-blue-200 transition"
                >
                  <Linkedin className="w-6 h-6 mr-2" />
                  <span className="font-medium">LinkedIn</span>
                </a>
                <a
                  href="#"
                  className="flex items-center text-gray-400 hover:text-gray-200 transition"
                >
                  <Github className="w-6 h-6 mr-2" />
                  <span className="font-medium">GitHub</span>
                </a>
              </div>
            </div>
            <div className="mt-8 md:mt-0 md:w-1/3">
              <img
                src="https://placehold.co/400x400/0f172a/ffffff?text=Elias"
                alt="Elias Khathutshelo"
                className="w-48 h-48 sm:w-64 sm:h-64 rounded-full object-cover border-4 border-blue-400 shadow-md mx-auto"
              />
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-12">
          <div className="bg-slate-800 p-8 rounded-3xl shadow-xl border border-slate-700">
            <div className="flex items-center justify-start mb-6">
              <Lightbulb className="w-8 h-8 text-yellow-400 mr-3" />
              <h2 className="text-3xl font-bold text-gray-100">Skills</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="bg-slate-700 text-gray-200 px-4 py-2 rounded-full font-medium">
                Data Analysis
              </span>
              <span className="bg-slate-700 text-gray-200 px-4 py-2 rounded-full font-medium">
                Python
              </span>
              <span className="bg-slate-700 text-gray-200 px-4 py-2 rounded-full font-medium">
                SQL
              </span>
              <span className="bg-slate-700 text-gray-200 px-4 py-2 rounded-full font-medium">
                Pandas
              </span>
              <span className="bg-slate-700 text-gray-200 px-4 py-2 rounded-full font-medium">
                NumPy
              </span>
              <span className="bg-slate-700 text-gray-200 px-4 py-2 rounded-full font-medium">
                Matplotlib
              </span>
              <span className="bg-slate-700 text-gray-200 px-4 py-2 rounded-full font-medium">
                Scikit-learn
              </span>
              <span className="bg-slate-700 text-gray-200 px-4 py-2 rounded-full font-medium">
                Tableau
              </span>
              <span className="bg-slate-700 text-gray-200 px-4 py-2 rounded-full font-medium">
                Power BI
              </span>
              <span className="bg-slate-700 text-gray-200 px-4 py-2 rounded-full font-medium">
                Data Cleaning
              </span>
              <span className="bg-slate-700 text-gray-200 px-4 py-2 rounded-full font-medium">
                Statistical Analysis
              </span>
              <span className="bg-slate-700 text-gray-200 px-4 py-2 rounded-full font-medium">
                Machine Learning
              </span>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Briefcase className="w-8 h-8 text-blue-400 mr-3" />
              <h2 className="text-3xl font-bold text-gray-100">Projects</h2>
            </div>
            {isAdmin && (
              <button
                onClick={() => {
                  setEditingProject(null);
                  setShowForm(true);
                }}
                className="bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-green-700 transition"
              >
                Add Project
              </button>
            )}
          </div>

          {error && (
            <div
              className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded-md mb-6"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <p className="text-center text-gray-400 col-span-full">
                Loading projects...
              </p>
            ) : projects.length > 0 ? (
              projects.map((project) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  isAdmin={isAdmin}
                  onEdit={(p) => {
                    setEditingProject(p);
                    setShowForm(true);
                  }}
                  onDelete={handleDeleteProject}
                />
              ))
            ) : (
              <p className="text-center text-gray-400 col-span-full">
                No projects found. Please add some.
              </p>
            )}
          </div>
        </section>

        {/* Project Form Modal */}
        {showForm && (
          <ProjectForm
            project={editingProject}
            onSave={handleSaveProject}
            onClose={() => setShowForm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default App;

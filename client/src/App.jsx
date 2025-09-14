import React, { useState, useEffect } from "react";
import { Linkedin, Github } from "lucide-react";

// Define the API endpoint for your projects
const API_URL = "http://localhost:5000/api/projects/";

const App = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch projects from the backend
  const fetchProjects = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
      setError(
        "Error fetching projects. Please ensure the server is running on http://localhost:5000."
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch projects when the component mounts
  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen text-gray-800 font-inter antialiased">
      <div className="container mx-auto p-4 md:p-8">
        {/* Header Section */}
        <header className="text-center py-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600">
            Elias Khathutshelo
          </h1>
          <p className="mt-2 text-lg md:text-xl font-medium text-gray-700">
            Passionate Data Analyst & Developer
          </p>
        </header>

        {/* About Section */}
        <section
          id="about"
          className="bg-white p-6 md:p-12 rounded-2xl shadow-xl mb-8 transition-all duration-300 transform hover:scale-[1.01]"
        >
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
            About Me
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <img
              src="https://placehold.co/400x400/2563eb/ffffff?text=Elias"
              alt="Elias Khathutshelo"
              className="w-48 h-48 rounded-full object-cover border-4 border-blue-600 shadow-lg"
            />
            <div className="text-center md:text-left">
              <p className="text-gray-600 text-lg leading-relaxed">
                I am a highly motivated and skilled data analyst with a strong
                background in extracting insights from complex datasets. My
                expertise lies in using Python, SQL, and data visualization
                tools to translate data into actionable business strategies. I
                have a proven track record of developing end-to-end data
                solutions, from data collection and cleaning to analysis and
                dashboard creation. I'm always eager to learn and apply new
                technologies to solve real-world problems.
              </p>
              <div className="flex justify-center md:justify-start gap-6 mt-6">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 font-semibold transition-all duration-300 hover:text-blue-800"
                >
                  <Linkedin size={24} /> LinkedIn
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 font-semibold transition-all duration-300 hover:text-blue-800"
                >
                  <Github size={24} /> GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          className="bg-white p-6 md:p-12 rounded-2xl shadow-xl mb-8 transition-all duration-300 transform hover:scale-[1.01]"
        >
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
            Skills
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="bg-gray-200 text-gray-700 font-semibold text-sm px-4 py-2 rounded-full shadow-sm">
              Data Analysis
            </span>
            <span className="bg-gray-200 text-gray-700 font-semibold text-sm px-4 py-2 rounded-full shadow-sm">
              Python
            </span>
            <span className="bg-gray-200 text-gray-700 font-semibold text-sm px-4 py-2 rounded-full shadow-sm">
              SQL
            </span>
            <span className="bg-gray-200 text-gray-700 font-semibold text-sm px-4 py-2 rounded-full shadow-sm">
              Pandas
            </span>
            <span className="bg-gray-200 text-gray-700 font-semibold text-sm px-4 py-2 rounded-full shadow-sm">
              NumPy
            </span>
            <span className="bg-gray-200 text-gray-700 font-semibold text-sm px-4 py-2 rounded-full shadow-sm">
              Matplotlib
            </span>
            <span className="bg-gray-200 text-gray-700 font-semibold text-sm px-4 py-2 rounded-full shadow-sm">
              Scikit-learn
            </span>
            <span className="bg-gray-200 text-gray-700 font-semibold text-sm px-4 py-2 rounded-full shadow-sm">
              Tableau
            </span>
            <span className="bg-gray-200 text-gray-700 font-semibold text-sm px-4 py-2 rounded-full shadow-sm">
              Power BI
            </span>
            <span className="bg-gray-200 text-gray-700 font-semibold text-sm px-4 py-2 rounded-full shadow-sm">
              Data Cleaning
            </span>
            <span className="bg-gray-200 text-gray-700 font-semibold text-sm px-4 py-2 rounded-full shadow-sm">
              Statistical Analysis
            </span>
            <span className="bg-gray-200 text-gray-700 font-semibold text-sm px-4 py-2 rounded-full shadow-sm">
              Machine Learning
            </span>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="bg-white p-6 md:p-12 rounded-2xl shadow-xl mb-8 transition-all duration-300 transform hover:scale-[1.01]"
        >
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
            Projects
          </h2>
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <p className="text-gray-500">Loading projects...</p>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 font-medium text-lg">
              {error}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="bg-gray-50 p-6 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105"
                >
                  <img
                    src={
                      project.imageUrl ||
                      "https://placehold.co/600x400/e5e7eb/374151?text=Project"
                    }
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold text-blue-600">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags &&
                      project.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-200 text-gray-700 font-semibold text-xs px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="bg-white p-6 md:p-12 rounded-2xl shadow-xl mb-8 transition-all duration-300 transform hover:scale-[1.01]"
        >
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
            Contact
          </h2>
          <div className="text-center">
            <p className="text-lg text-gray-600 mb-6">
              Feel free to get in touch with me to discuss a project or just say
              hello!
            </p>
            <form className="max-w-xl mx-auto space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <textarea
                rows="4"
                placeholder="Your Message"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              ></textarea>
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;

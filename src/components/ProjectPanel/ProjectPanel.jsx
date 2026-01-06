import "./ProjectPanel.css";

function ProjectPanel({ projects }) {
  return (
    <div className="projects-card">
      <h3 className="projects-title">Projects</h3>

      <div className="projects-list">
        {projects.map((project, index) => (
          <div className="project-item" key={index}>
            <img
              src={project.image}
              alt={project.name}
              className="project-img"
            />

            <div className="project-name">
              {project.name}
            </div>

            <div className="project-location">
              HSR Layout, Bangalore
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectPanel;
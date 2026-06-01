import { useState, useEffect } from 'react';
import { projects } from '../data/portfolio';
import './Projects.css';

function ProjectModal({ project, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={project.name}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Close">✕</button>

        <div className="modal__header">
          <h3 className="modal__title">{project.name}</h3>
          <p className="modal__tagline">{project.tagline}</p>
        </div>

        <div className="modal__section">
          <h4 className="modal__label">왜 만들었나</h4>
          <p className="modal__text">{project.why}</p>
        </div>

        <div className="modal__row">
          <div className="modal__section">
            <h4 className="modal__label">문제</h4>
            <p className="modal__text">{project.problem}</p>
          </div>
          <div className="modal__section">
            <h4 className="modal__label">해결</h4>
            <p className="modal__text">{project.solution}</p>
          </div>
        </div>

        {/* Service Flow */}
        {project.flow && project.flow.length > 0 && (
          <div className="modal__section">
            <h4 className="modal__label">서비스 플로우</h4>
            <div className="modal__flow">
              {project.flow.map((step, i) => (
                <div key={i} className="modal__flow-item">
                  <div className="modal__flow-step">
                    <span className="modal__flow-num">{i + 1}</span>
                    <span className="modal__flow-text">{step}</span>
                  </div>
                  {i < project.flow.length - 1 && (
                    <span className="modal__flow-arrow" aria-hidden="true">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="modal__section">
          <h4 className="modal__label">핵심 설계 역량</h4>
          <div className="modal__competencies">
            {project.competencies.map((c) => (
              <div key={c.label} className="modal__competency">
                <span className="modal__competency-label">{c.label}</span>
                <span className="modal__competency-detail">{c.detail}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="modal__stack">
          {project.stack.map((tag) => (
            <span key={tag} className="modal__pill">{tag}</span>
          ))}
        </div>

        <div className="modal__links">
          {project.githubUrl && (
            <a href={project.githubUrl} className="modal__btn modal__btn--github"
               target="_blank" rel="noopener noreferrer">
              <GitHubIcon /> GitHub
            </a>
          )}
          {project.demoUrl && (
            <a href={project.demoUrl} className="modal__btn modal__btn--demo"
               target="_blank" rel="noopener noreferrer">
              Live Demo ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <button
      className="pj-card"
      style={{ '--i': index }}
      onClick={() => {}}
      aria-label={`View details for ${project.name}`}
    >
      <div className="pj-card__index">{String(index + 1).padStart(2, '0')}</div>
      <h3 className="pj-card__title">{project.name}</h3>
      <p className="pj-card__tagline">{project.tagline}</p>
      <div className="pj-card__stack">
        {project.stack.slice(0, 3).map((tag) => (
          <span key={tag} className="pj-card__pill">{tag}</span>
        ))}
        {project.stack.length > 3 && (
          <span className="pj-card__pill pj-card__pill--more">+{project.stack.length - 3}</span>
        )}
      </div>
      <span className="pj-card__cta">자세히 보기 →</span>
    </button>
  );
}

function Projects() {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  return (
    <section id="projects" className="projects">
      <div className="projects__inner">
        <h2 className="projects__heading gradient-text">Projects</h2>
        <p className="projects__sub">6개 프로젝트 — 클릭해서 자세히 보기</p>

        <div className="projects__grid">
          {projects.map((project, i) => (
            <button
              key={project.id}
              className="pj-card"
              style={{ '--i': i }}
              onClick={() => setSelected(project)}
              aria-label={`View details for ${project.name}`}
            >
              <div className="pj-card__index">{String(i + 1).padStart(2, '0')}</div>
              <h3 className="pj-card__title">{project.name}</h3>
              <p className="pj-card__tagline">{project.tagline}</p>
              <div className="pj-card__stack">
                {project.stack.slice(0, 3).map((tag) => (
                  <span key={tag} className="pj-card__pill">{tag}</span>
                ))}
                {project.stack.length > 3 && (
                  <span className="pj-card__pill pj-card__pill--more">+{project.stack.length - 3}</span>
                )}
              </div>
              <span className="pj-card__cta">자세히 보기 →</span>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
}

export default Projects;

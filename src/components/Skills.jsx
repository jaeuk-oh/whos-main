import { capabilities } from '../data/portfolio';
import { useInView } from '../hooks/useInView';
import './Skills.css';

const ICONS = {
  'agent-design':       '⚙',
  'rag-retrieval':      '🔍',
  'output-control':     '🎯',
  'service-engineering':'🚀',
};

function CapabilityCard({ cap, index }) {
  const [ref, isInView] = useInView({ rootMargin: '-5% 0px -5% 0px' });

  return (
    <div
      ref={ref}
      className={`skill-card${isInView ? ' skill-card--visible' : ''}`}
      style={{ '--i': index }}
    >
      <div className="skill-card__icon" aria-hidden="true">
        {ICONS[cap.id] || '◆'}
      </div>
      <h3 className="skill-card__title">{cap.title}</h3>
      <p className="skill-card__desc">{cap.description}</p>
      <div className="skill-card__tags">
        {cap.tags.map((tag) => (
          <span key={tag} className="skill-card__tag">{tag}</span>
        ))}
      </div>
    </div>
  );
}

function Skills() {
  return (
    <section id="skills" className="skills">
      <div className="skills__inner">
        <div className="skills__header">
          <h2 className="skills__heading gradient-text">Skills &amp; Stack</h2>
          <p className="skills__sub">도구를 나열하는 대신, 무엇을 할 줄 아는지 보여드립니다.</p>
        </div>
        <div className="skills__grid">
          {capabilities.map((cap, i) => (
            <CapabilityCard key={cap.id} cap={cap} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;

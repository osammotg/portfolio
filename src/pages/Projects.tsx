import React, { useState } from 'react';
import './Projects.css';
import StrikerCard from '../components/StrikerCard';
import HackathonCard from '../components/HackathonCard';
import ProjectHeroCard from '../components/ProjectHeroCard';
import { projectsData } from '../data/projects';

type FilterValue = 'all' | 'startup' | 'side-project' | 'hackathon';

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: 'all',          label: 'All' },
  { value: 'startup',      label: 'Startups' },
  { value: 'side-project', label: 'Side Projects' },
  { value: 'hackathon',    label: 'Hackathons' },
];

const otherProjects = Object.values(projectsData);

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterValue>('all');

  const show = (cat: 'startup' | 'hackathon') =>
    activeFilter === 'all' || activeFilter === cat;

  const visibleOthers = otherProjects.filter(
    p => activeFilter === 'all' || p.category === activeFilter
  );

  return (
    <div className="projects-container">
      <div className="projects-filters">
        {FILTERS.map(f => (
          <button
            key={f.value}
            className={`projects-filter-btn${activeFilter === f.value ? ' projects-filter-btn--active' : ''}`}
            onClick={() => setActiveFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {show('startup')  && <StrikerCard />}
        {show('hackathon') && <HackathonCard />}
        {visibleOthers.map((project, index) => (
          <ProjectHeroCard key={project.title} {...project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;

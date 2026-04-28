import React from 'react';
import './Skills.css';
import { FaCode, FaDatabase, FaGlobe, FaLanguage, FaRobot, FaServer } from 'react-icons/fa';
import {
  SiCplusplus,
  SiDocker,
  SiGit,
  SiHuggingface,
  SiMysql,
  SiPython,
  SiPytorch,
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiKubernetes,
  SiFirebase,
  SiWordpress,
  SiPhp,
  SiStripe,
} from 'react-icons/si';

type SkillItem = {
  name: string;
  description: string;
  icon: JSX.Element;
};

type SkillCategory = {
  title: string;
  items: SkillItem[];
};

const categories: SkillCategory[] = [
  {
    title: 'Programming Languages',
    items: [
      { name: 'Python', description: 'Primary language — ML, robotics, data', icon: <SiPython /> },
      { name: 'TypeScript', description: 'Frontend & backend', icon: <SiTypescript /> },
      { name: 'PHP', description: 'WordPress / backend APIs', icon: <SiPhp /> },
      { name: 'C / C++', description: 'Embedded systems, CAN bus, motor control', icon: <SiCplusplus /> },
      { name: 'SQL', description: 'MySQL, relational databases', icon: <FaDatabase /> },
      { name: 'MATLAB', description: 'Control systems, signal processing', icon: <FaCode /> },
    ]
  },
  {
    title: 'Web & Mobile',
    items: [
      { name: 'React', description: 'Web & mobile UI', icon: <SiReact /> },
      { name: 'Next.js', description: 'Full-stack web', icon: <SiNextdotjs /> },
      { name: 'WordPress', description: 'CMS & REST API backend', icon: <SiWordpress /> },
      { name: 'Stripe', description: 'Payments & escrow', icon: <SiStripe /> },
      { name: 'Firebase', description: 'Push notifications, auth', icon: <SiFirebase /> },
      { name: 'MySQL', description: 'Production database', icon: <SiMysql /> },
    ]
  },
  {
    title: 'AI & Robotics',
    items: [
      { name: 'PyTorch', description: 'Deep learning, imitation learning', icon: <SiPytorch /> },
      { name: 'LeRobot', description: 'Robot learning framework', icon: <FaRobot /> },
      { name: 'HuggingFace', description: 'Model hub, transformers', icon: <SiHuggingface /> },
      { name: 'ROS / CAN Bus', description: 'Robot OS, motor control', icon: <FaRobot /> },
      { name: 'MuJoCo', description: 'Physics simulation', icon: <FaCode /> },
      { name: 'OpenCV', description: 'Computer vision', icon: <FaCode /> },
    ]
  },
  {
    title: 'Infrastructure & Tools',
    items: [
      { name: 'Kubernetes', description: 'Container orchestration (AWS EKS)', icon: <SiKubernetes /> },
      { name: 'Docker', description: 'Containerisation', icon: <SiDocker /> },
      { name: 'Git', description: 'Version control', icon: <SiGit /> },
      { name: 'AWS', description: 'EKS, S3, Karpenter', icon: <FaServer /> },
      { name: 'Vercel', description: 'Frontend deployment', icon: <FaCode /> },
    ]
  },
  {
    title: 'Languages',
    items: [
      { name: 'Italian', description: 'Native', icon: <FaGlobe /> },
      { name: 'French', description: 'Native', icon: <FaGlobe /> },
      { name: 'English', description: 'Fluent', icon: <FaGlobe /> },
      { name: 'German', description: 'Fluent (B2/C1)', icon: <FaLanguage /> },
      { name: 'Spanish', description: 'Conversational', icon: <FaLanguage /> },
      { name: 'Russian', description: 'Conversational', icon: <FaLanguage /> },
    ]
  }
];

const Skills: React.FC = () => {
  return (
    <div className="skills-container">
      {categories.map((category) => (
        <div key={category.title} className="skill-category">
          <h3 className="category-title">{category.title}</h3>
          <div className="skills-grid">
            {category.items.map((item) => (
              <div key={item.name} className="skill-card">
                <div className="skill-icon">{item.icon}</div>
                <h4 className="skill-name">{item.name}</h4>
                <p className="skill-description">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skills;

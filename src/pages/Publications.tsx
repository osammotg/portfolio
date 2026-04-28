import React from 'react';
import './Publications.css';
import { FaFlask, FaRobot, FaUsers } from 'react-icons/fa';

const papers = [
  {
    icon: <FaRobot />,
    label: 'Research Paper',
    title: 'Vision-Language-Action Models for Physical Manipulation',
    description:
      'Investigating how robots can learn generalised manipulation policies from egocentric video and language instructions — combining imitation learning (ACT, DAgger) with world model fine-tuning on the Polaris data pipeline.',
    status: 'In Progress',
    target: 'Microsoft Research Zurich · ETH CVG',
    tags: ['VLAs', 'Imitation Learning', 'Robot Learning'],
    accent: '#e50914',
  },
  {
    icon: <FaFlask />,
    label: 'Master Thesis',
    title: 'Scalable Data Pipelines for Robot Learning at Scale',
    description:
      'MSc thesis focusing on scalable data collection and training pipelines for physical manipulation — from teleoperation demos to deployable policies on the ETH NVIDIA H100 cluster.',
    status: 'In Progress',
    target: 'ETH Zurich · Mechanical Engineering',
    tags: ['Data Pipelines', 'Imitation Learning', 'ETH Zurich'],
    accent: '#8058ff',
  },
  {
    icon: <FaUsers />,
    label: 'Club Paper',
    title: 'YAMS: A Bimanual Teleoperation System for Robot Learning',
    description:
      'Documenting the YAMS bimanual teleoperation platform built at the ETH Robotics Club — 120 Hz control loop, 3 synchronised camera streams, ACT policy achieving 90% success on transfer-cube tasks.',
    status: 'In Development',
    target: 'ETH Robotics Club · ETHRC',
    tags: ['YAMS', 'Bimanual', 'Teleoperation', 'ACT'],
    accent: '#00bcd4',
  },
];

const Publications: React.FC = () => {
  return (
    <div className="publications-page">

      <div className="publications-hero">
        <div className="publications-hero-content">
          <p className="publications-kicker">Research &amp; Publications</p>
          <h1>Robot Learning &amp; VLAs</h1>
          <p className="publications-intro">
            My research centres on robot learning and Vision Language Actions — how robots can learn
            to act from human demonstrations, egocentric video, and language instructions. I work on
            imitation learning (ACT, DAgger), world models, and scalable data collection pipelines
            for physical manipulation. Longer term, I aim to bridge the gap between human video
            priors and deployable robot control policies.
          </p>
        </div>
      </div>

      <div className="publications-section">
        <div className="publications-goal-header">
          <div className="publications-goal-title">
            <span className="goal-year">2026</span>
            <span className="goal-text">Submit 3 papers</span>
          </div>
          <div className="goal-tracker">
            <div className="goal-pip goal-pip--active" title="Paper 1" />
            <div className="goal-pip goal-pip--active" title="Paper 2" />
            <div className="goal-pip goal-pip--active" title="Paper 3" />
            <span className="goal-tracker-label">0 / 3 submitted</span>
          </div>
        </div>

        <div className="publications-grid">
          {papers.map((paper, i) => (
            <div
              key={i}
              className="publication-card"
              style={{ '--pub-accent': paper.accent } as React.CSSProperties}
            >
              <div className="publication-header">
                <span className="publication-icon" style={{ color: paper.accent }}>
                  {paper.icon}
                </span>
                <div className="publication-meta">
                  <span className="publication-venue">{paper.label}</span>
                  <span className={`pub-status pub-status--${paper.status === 'In Progress' ? 'wip' : 'dev'}`}>
                    {paper.status}
                  </span>
                </div>
              </div>

              <h3 className="publication-title">{paper.title}</h3>
              <p className="publication-summary">{paper.description}</p>

              <div className="publication-tags">
                {paper.tags.map(tag => (
                  <span key={tag} className="publication-tag">{tag}</span>
                ))}
              </div>

              <p className="publication-target">{paper.target}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Publications;

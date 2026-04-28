import React, { useState, useEffect } from 'react';
import { FaExternalLinkAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import winnersPhoto from '../images/hackathon/winners.png';
import groupPhoto from '../images/hackathon/group.png';
import stackAuthLogo from '../images/logos/stack-auth.png';
import './HackathonCard.css';

const slides = [groupPhoto, winnersPhoto];

const HackathonCard: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setCurrent(i => (i + 1) % slides.length), 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="hackathon-card">
      <div className="hackathon-hero">
        {slides.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={i === 0 ? 'Stack Auth Hackathon group' : 'Hackathon winners'}
            className={`hackathon-slide${i === current ? ' hackathon-slide--active' : ''}`}
          />
        ))}
        <div className="hackathon-gradient" />

        <div className="hackathon-overlay">
          <div className="hackathon-header">
            <img src={stackAuthLogo} alt="Stack Auth" className="hackathon-logo" />
            <div className="hackathon-badges">
              <span className="hackathon-badge hackathon-badge--gold">4 hackathons</span>
              <span className="hackathon-badge hackathon-badge--dark">San Francisco</span>
              <span className="hackathon-badge hackathon-badge--dark">YC S24</span>
            </div>
          </div>

          <h2 className="hackathon-title">Stack Auth Hackathons</h2>
          <p className="hackathon-subtitle">Organiser & Developer Advocate · Sep – Dec 2025</p>

          <p className="hackathon-desc">
            Organised and led 4 developer hackathons in San Francisco for Stack Auth (YC S24) —
            bringing together the dev community to stress-test newly shipped features and collect
            real-time feedback that shaped the roadmap.
          </p>

          <div className="hackathon-stats">
            <div className="hackathon-stat">
              <span className="hackathon-stat-number">4</span>
              <span className="hackathon-stat-label">Events</span>
            </div>
            <div className="hackathon-stat">
              <span className="hackathon-stat-number">SF</span>
              <span className="hackathon-stat-label">San Francisco</span>
            </div>
            <div className="hackathon-stat">
              <span className="hackathon-stat-number">$1k</span>
              <span className="hackathon-stat-label">Prize</span>
            </div>
          </div>

          <div className="hackathon-actions">
            <a href="https://stack-auth.com" target="_blank" rel="noopener noreferrer" className="hackathon-link-btn">
              <FaExternalLinkAlt /> stack-auth.com
            </a>
            <button className="hackathon-expand-btn" onClick={() => setExpanded(e => !e)}>
              {expanded ? <><FaChevronUp /> Hide details</> : <><FaChevronDown /> More details</>}
            </button>
          </div>

          <div className="hackathon-slide-dots">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`hackathon-dot${i === current ? ' hackathon-dot--active' : ''}`}
                onClick={() => setCurrent(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {expanded && (
        <div className="hackathon-story">
          <div className="hackathon-story-grid">
            <div>
              <h4>Role</h4>
              <p>
                End-to-end event production: venue, scheduling, participant outreach, judging
                criteria, and live support during hacking sessions.
              </p>
            </div>
            <div>
              <h4>Format</h4>
              <p>
                "Stacker House Hackathons" — intimate house-party format in SF.
                Developers built with Stack Auth's SDK, competing for cash prizes.
                Winning team pocketed $1,000.
              </p>
            </div>
            <div>
              <h4>Impact</h4>
              <p>
                Structured feedback on MCP integration, org management, and OAuth flows —
                accelerating iteration cycles by days vs. traditional research.
              </p>
            </div>
            <div>
              <h4>Engineering</h4>
              <p>
                Also shipped code at Stack Auth: Model Context Protocol (MCP) implementation
                for the open-source auth SDK.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HackathonCard;

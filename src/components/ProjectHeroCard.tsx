import React, { useState, useEffect, useRef } from 'react';
import { FaExternalLinkAlt, FaGithub, FaChevronDown, FaChevronUp, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import './ProjectHeroCard.css';

export interface ProjectHeroLink {
  label: string;
  href: string;
  icon?: 'github' | 'external';
  primary?: boolean;
}

export interface ProjectHeroStat {
  value: string;
  label: string;
}

export interface ProjectHeroStoryItem {
  heading: string;
  text: string;
}

export interface ProjectHeroCardProps {
  images: string[];
  video?: string;
  category?: 'startup' | 'side-project' | 'hackathon';
  title: string;
  subtitle: string;
  description: string;
  badges: string[];
  stats?: ProjectHeroStat[];
  tech: string[];
  links?: ProjectHeroLink[];
  story?: ProjectHeroStoryItem[];
  accent?: string;
  imagePosition?: string;
  autoSlideMs?: number;
}

const ProjectHeroCard: React.FC<ProjectHeroCardProps> = ({
  images,
  video,
  title,
  subtitle,
  description,
  badges,
  stats,
  tech,
  links = [],
  story = [],
  accent = '#e50914',
  imagePosition = 'center 30%',
  autoSlideMs = 4500,
}) => {
  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const multiSlide = !video && images.length > 1;

  const toggleMute = () => {
    if (videoRef.current) videoRef.current.muted = !muted;
    setMuted(m => !m);
  };

  useEffect(() => {
    if (!multiSlide) return;
    const id = setInterval(() => setCurrent(i => (i + 1) % images.length), autoSlideMs);
    return () => clearInterval(id);
  }, [images.length, multiSlide, autoSlideMs]);

  return (
    <div className="phc-card" style={{ '--phc-accent': accent } as React.CSSProperties}>
      <div className="phc-hero">
        {video ? (
          <video
            ref={videoRef}
            className="phc-slide phc-slide--active phc-video"
            src={video}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${title} — visual ${i + 1}`}
              className={`phc-slide${i === current ? ' phc-slide--active' : ''}`}
              style={{ objectPosition: imagePosition }}
            />
          ))
        )}
        <div className="phc-gradient" />

        {video && (
          <button className="phc-mute-btn" onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
            {muted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
        )}

        <div className="phc-overlay">
          <div className="phc-badges">
            {badges.map(b => (
              <span key={b} className="phc-badge">{b}</span>
            ))}
          </div>

          <h2 className="phc-title">{title}</h2>
          <p className="phc-subtitle">{subtitle}</p>
          <p className="phc-desc">{description}</p>

          {stats && stats.length > 0 && (
            <div className="phc-stats">
              {stats.map(s => (
                <div key={s.label} className="phc-stat">
                  <span className="phc-stat-number">{s.value}</span>
                  <span className="phc-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          )}

          <div className="phc-tech">
            {tech.map(t => (
              <span key={t} className="phc-tech-pill">{t}</span>
            ))}
          </div>

          <div className="phc-actions">
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`phc-link-btn${l.primary ? ' phc-link-btn--primary' : ''}`}
              >
                {l.icon === 'github' ? <FaGithub /> : <FaExternalLinkAlt />}
                {l.label}
              </a>
            ))}
            {story.length > 0 && (
              <button className="phc-expand-btn" onClick={() => setExpanded(e => !e)}>
                {expanded ? <><FaChevronUp /> Hide details</> : <><FaChevronDown /> More details</>}
              </button>
            )}
          </div>

          {multiSlide && (
            <div className="phc-dots">
              {images.map((_, i) => (
                <button
                  key={i}
                  className={`phc-dot${i === current ? ' phc-dot--active' : ''}`}
                  onClick={() => setCurrent(i)}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {expanded && story.length > 0 && (
        <div className="phc-story">
          <div className="phc-story-grid">
            {story.map(item => (
              <div key={item.heading}>
                <h4>{item.heading}</h4>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectHeroCard;

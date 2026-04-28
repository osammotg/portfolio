import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaGithub, FaExternalLinkAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { SiAppstore, SiGoogleplay } from 'react-icons/si';
import gamesPage from '../images/striker-screens/games-page.png';
import homePage from '../images/striker-screens/home-page.png';
import walletPage from '../images/striker-screens/wallet.png';
import joinTeamPage from '../images/striker-screens/join-team.png';
import matchPage from '../images/striker-screens/match-page.png';
import communityPhoto from '../images/striker-community.jpg';
import './StrikerCard.css';
import StrikerMap from './StrikerMap';

const screenshots = [
  { src: gamesPage, caption: 'Browse & join games' },
  { src: homePage, caption: 'Home — wallet & upcoming games' },
  { src: walletPage, caption: 'StrikerCredits wallet' },
  { src: joinTeamPage, caption: 'Join a team flow' },
  { src: matchPage, caption: 'Match page' },
];

const StrikerCard: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const prev = () => setCurrent(i => (i - 1 + screenshots.length) % screenshots.length);
  const next = () => setCurrent(i => (i + 1) % screenshots.length);

  return (
    <div className="striker-card">
      <div className="striker-main">

        <div className="striker-carousel">
          <button className="carousel-btn carousel-btn--left" onClick={prev} aria-label="Previous">
            <FaChevronLeft />
          </button>

          <div className="iphone-mockup">
            <div className="iphone-btn iphone-btn--vol-up" />
            <div className="iphone-btn iphone-btn--vol-down" />
            <div className="iphone-btn iphone-btn--power" />
            <div className="iphone-inner">
              <div className="iphone-dynamic-island" />
              <div className="iphone-screen">
                <img
                  src={screenshots[current].src}
                  alt={screenshots[current].caption}
                  className="iphone-img"
                />
              </div>
              <div className="iphone-home-bar" />
            </div>
          </div>

          <button className="carousel-btn carousel-btn--right" onClick={next} aria-label="Next">
            <FaChevronRight />
          </button>
          <p className="carousel-caption">{screenshots[current].caption}</p>
          <div className="carousel-dots">
            {screenshots.map((_, i) => (
              <button
                key={i}
                className={`carousel-dot${i === current ? ' carousel-dot--active' : ''}`}
                onClick={() => setCurrent(i)}
                aria-label={`Screenshot ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="striker-content">
          <div className="striker-badges">
            <span className="striker-badge striker-badge--red">iOS + Android</span>
            <span className="striker-badge striker-badge--dark">3,000+ players</span>
            <span className="striker-badge striker-badge--dark">500+ games</span>
            <span className="striker-badge striker-badge--dark">CHF 15k raised</span>
            <span className="striker-badge striker-badge--green">Live</span>
          </div>

          <h2 className="striker-title">Striker</h2>
          <p className="striker-subtitle">Previously FuzeFoot · 2022 – Present</p>

          <p className="striker-desc">
            Mobile app replacing WhatsApp groups for amateur football. Players pay per game
            via Stripe, Apple Pay, or Twint — no more no-shows. Launched in Zurich, Geneva, and Paris.
          </p>

          <div className="striker-tech">
            {['React', 'Capacitor', 'TypeScript', 'WordPress', 'PHP', 'MySQL', 'Stripe', 'Firebase'].map(t => (
              <span key={t} className="striker-tech-pill">{t}</span>
            ))}
          </div>

          <div className="striker-links">
            <a href="https://apps.apple.com/ch/app/striker/id6740439045" target="_blank" rel="noopener noreferrer" className="striker-store-btn">
              <SiAppstore /> App Store
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.striker.ssf" target="_blank" rel="noopener noreferrer" className="striker-store-btn">
              <SiGoogleplay /> Google Play
            </a>
            <a href="https://www.striker.football" target="_blank" rel="noopener noreferrer" className="striker-link-btn">
              <FaExternalLinkAlt /> striker.football
            </a>
            <a href="https://github.com/osammotg/striker" target="_blank" rel="noopener noreferrer" className="striker-link-btn">
              <FaGithub /> GitHub
            </a>
          </div>

          <div className="striker-map-inline">
            <StrikerMap />
          </div>

          <button className="striker-expand-btn" onClick={() => setExpanded(e => !e)}>
            {expanded ? <><FaChevronUp /> Hide full story</> : <><FaChevronDown /> Full story</>}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="striker-story">
          <div className="striker-community-banner">
            <img src={communityPhoto} alt="Striker community" className="striker-community-img" />
            <div className="striker-community-label">3,000+ member community · Zurich, Geneva &amp; Paris</div>
          </div>
          <div className="striker-story-grid">
            <div>
              <h4>Origin</h4>
              <p>
                Started as <strong>FuzeFoot</strong> in 2022 in Geneva — a React Native app letting players
                find and join pick-up games. 1,000+ members, 350+ games. Sold a 60% stake for 5,000 EUR before
                pivoting.
              </p>
            </div>
            <div>
              <h4>Striker (2024 – Present)</h4>
              <p>
                Full rebuild as <strong>Striker</strong>: React + Capacitor (single codebase for iOS/Android),
                paid-entry model with Stripe/Apple Pay/Twint. Expanded to Zurich and Paris.
                Raised CHF 15k from football-industry angels.
              </p>
            </div>
            <div>
              <h4>Business model</h4>
              <p>
                Organisers set a price per player. Striker takes a platform fee. Pre-authorisation holds
                funds until minimum players join — no payment if the game doesn't fill.
              </p>
            </div>
            <div>
              <h4>What I built</h4>
              <p>
                Full-stack: React + TypeScript frontend, WordPress + PHP REST backend, MySQL database,
                Firebase push notifications, Stripe payment intents, custom CMS for venue management.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StrikerCard;

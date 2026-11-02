import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaBriefcase, FaTools, FaEnvelope, FaGraduationCap, FaBookOpen, FaProjectDiagram } from 'react-icons/fa';
import './Navbar.css';
import netflixLogo from '../images/logo-2.png';
import blueImage from '../images/blue.png';

// On the general research page the nav jumps within the page instead of
// sending a professor off to the rest of the portfolio.
const RESEARCH_ROUTES = ['/research', '/research/robotics', '/research/stanford'];
const RESEARCH_ANCHORS = [
  { id: 'projects', label: 'Projects' },
  { id: 'journey', label: 'Journey' },
  { id: 'research', label: 'Research' },
  { id: 'contact', label: 'Contact' },
];

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const profileImage = location.state?.profileImage || blueImage;

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 80);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const isResearch = RESEARCH_ROUTES.includes(location.pathname.replace(/\/$/, ''));
  const jumpTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    closeSidebar();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            <img src={netflixLogo} alt="Netflix" />
          </Link>
          {isResearch ? (
            <ul className="navbar-links">
              {RESEARCH_ANCHORS.map(({ id, label }) => (
                <li key={id}><a href={`#${id}`} onClick={jumpTo(id)}>{label}</a></li>
              ))}
            </ul>
          ) : (
          <ul className="navbar-links">
            <li><Link to="/browse">Home</Link></li>
            <li><Link to="/experience">Experience</Link></li>
            <li><Link to="/education">Education</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/publications">Publications</Link></li>
            <li><Link to="/skills">Skills</Link></li>
            <li><Link to="/contact-me">Contact Me</Link></li>
          </ul>
          )}
        </div>
        <div className="navbar-right">
          {/* Hamburger menu for mobile */}
          <div className="hamburger" onClick={toggleSidebar}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <img src={profileImage} alt="Profile" className="profile-icon" onClick={() => { navigate('/browse') }} />
        </div>
      </nav>

      {/* Sidebar Overlay */}
      <div className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={closeSidebar}></div>

      {/* Sidebar (only visible on mobile) */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <img src={netflixLogo} alt="Netflix Logo" />
        </div>
        {isResearch ? (
          <ul>
            {RESEARCH_ANCHORS.map(({ id, label }) => (
              <li key={id}><a href={`#${id}`} onClick={jumpTo(id)}>{label}</a></li>
            ))}
          </ul>
        ) : (
        <ul>
          <li><Link to="/browse" onClick={closeSidebar}><FaHome /> Home</Link></li>
          <li><Link to="/experience" onClick={closeSidebar}><FaBriefcase /> Experience</Link></li>
          <li><Link to="/education" onClick={closeSidebar}><FaGraduationCap /> Education</Link></li>
          <li><Link to="/projects" onClick={closeSidebar}><FaProjectDiagram /> Projects</Link></li>
          <li><Link to="/publications" onClick={closeSidebar}><FaBookOpen /> Publications</Link></li>
          <li><Link to="/skills" onClick={closeSidebar}><FaTools /> Skills</Link></li>
          <li><Link to="/contact-me" onClick={closeSidebar}><FaEnvelope /> Contact Me</Link></li>
        </ul>
        )}
      </div>
    </>
  );
};

export default Navbar;

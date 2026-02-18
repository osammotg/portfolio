import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TopPicksRow.css';
import { FaBriefcase, FaCertificate, FaProjectDiagram, FaEnvelope, FaMusic, FaBook, FaGraduationCap, FaTrophy, FaTools } from 'react-icons/fa';

type ProfileType = 'recruiter' | 'explorer' | 'academia';

interface TopPicksRowProps {
  profile: ProfileType;
}

const topPicksConfig = {
  recruiter: [
    { title: "Research & Experience", imgSrc: "https://picsum.photos/seed/experience/250/200", icon: <FaBriefcase />, route: "/experience" },
    { title: "Education", imgSrc: "https://picsum.photos/seed/education/250/200", icon: <FaGraduationCap />, route: "/education" },
    { title: "Certifications", imgSrc: "https://picsum.photos/seed/certifications/250/200", icon: <FaCertificate />, route: "/certifications" },
    { title: "Skills", imgSrc: "https://picsum.photos/seed/skills/250/200", icon: <FaTools />, route: "/skills" },
    { title: "Work Permit", imgSrc: "https://picsum.photos/seed/workpermit/250/200", icon: <FaBriefcase />, route: "/work-permit" },
    { title: "Contact Me", imgSrc: "https://picsum.photos/seed/connect/250/200", icon: <FaEnvelope />, route: "/contact-me" }
  ],
  explorer: [
    { title: "Music", imgSrc: "https://picsum.photos/seed/music/250/200", route: "/music", icon: <FaMusic /> },
    { title: "Reading", imgSrc: "https://picsum.photos/seed/books/250/200", route: "/reading", icon: <FaBook /> },
    { title: "Projects", imgSrc: "https://picsum.photos/seed/innovation/250/200", route: "/projects", icon: <FaProjectDiagram /> },
    { title: "Certifications", imgSrc: "https://picsum.photos/seed/medal/250/200", route: "/certifications", icon: <FaCertificate /> },
    { title: "Achievements", imgSrc: "https://picsum.photos/seed/achievements/250/200", route: "/achievements", icon: <FaTrophy /> },
    { title: "Contact Me", imgSrc: "https://picsum.photos/seed/connect/250/200", route: "/contact-me", icon: <FaEnvelope /> }
  ],
  academia: [
    { title: "Education", imgSrc: "https://picsum.photos/seed/education/250/200", icon: <FaGraduationCap />, route: "/education" },
    { title: "Publications", imgSrc: "https://picsum.photos/seed/publications/250/200", icon: <FaBook />, route: "/publications" },
    { title: "Research & Experience", imgSrc: "https://picsum.photos/seed/research/250/200", icon: <FaBriefcase />, route: "/experience" },
    { title: "Achievements", imgSrc: "https://picsum.photos/seed/achievements/250/200", icon: <FaTrophy />, route: "/achievements" },
    { title: "Contact Me", imgSrc: "https://picsum.photos/seed/connect/250/200", icon: <FaEnvelope />, route: "/contact-me" }
  ]
};


const TopPicksRow: React.FC<TopPicksRowProps> = ({ profile }) => {
  const navigate = useNavigate();
  const topPicks = topPicksConfig[profile];

  return (
    <div className="top-picks-row">
      <h2 className="row-title">Today's Top Picks for {profile}</h2>
      <div className="card-row">
      {topPicks.map((pick, index) => (
          <div 
            key={index} 
            className="pick-card" 
            onClick={() => navigate(pick.route)}
            style={{ animationDelay: `${index * 0.2}s` }} 
          >
            <img src={pick.imgSrc} alt={pick.title} className="pick-image" />
            <div className="overlay">
              <div className="pick-label">{pick.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPicksRow;

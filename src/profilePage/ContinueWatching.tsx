import React from 'react';
import { Link } from 'react-router-dom';
import './ContinueWatching.css';

type ProfileType = 'recruiter' | 'explorer' | 'academia';

interface ContinueWatchingProps {
  profile: ProfileType;
}

const continueWatchingConfig = {
  recruiter: [
    { title: "Recommendations", imgSrc: "https://picsum.photos/seed/recommendations/300/200", link: "/recommendations" },
    { title: "Projects", imgSrc: "https://picsum.photos/seed/projects/300/200", link: "/projects" },
    { title: "Publications", imgSrc: "https://picsum.photos/seed/publications/300/200", link: "/publications" },
    { title: "Achievements", imgSrc: "https://picsum.photos/seed/achievements/300/200", link: "/achievements" },
    { title: "Music", imgSrc: "https://picsum.photos/seed/music/300/200", link: "/music" },
    { title: "Reading", imgSrc: "https://picsum.photos/seed/books/300/200", link: "/reading" }
  ],
  explorer: [
    { title: "Recommendations", imgSrc: "https://picsum.photos/seed/recommendations/300/200", link: "/recommendations" },
    { title: "Skills", imgSrc: "https://picsum.photos/seed/skills/300/200", link: "/skills" },
    { title: "Work Permit", imgSrc: "https://picsum.photos/seed/workpermit/300/200", link: "/work-permit" },
    { title: "Education", imgSrc: "https://picsum.photos/seed/education/300/200", link: "/education" },
    { title: "Research & Experience", imgSrc: "https://picsum.photos/seed/experience/300/200", link: "/experience" },
    { title: "Publications", imgSrc: "https://picsum.photos/seed/publications/300/200", link: "/publications" }
  ],
  academia: [
    { title: "Certifications", imgSrc: "https://picsum.photos/seed/certifications/300/200", link: "/certifications" },
    { title: "Projects", imgSrc: "https://picsum.photos/seed/projects/300/200", link: "/projects" },
    { title: "Recommendations", imgSrc: "https://picsum.photos/seed/recommendations/300/200", link: "/recommendations" },
    { title: "Skills", imgSrc: "https://picsum.photos/seed/skills/300/200", link: "/skills" },
    { title: "Reading", imgSrc: "https://picsum.photos/seed/books/300/200", link: "/reading" },
    { title: "Music", imgSrc: "https://picsum.photos/seed/music/300/200", link: "/music" }
  ]
};

const ContinueWatching: React.FC<ContinueWatchingProps> = ({ profile }) => {
  const continueWatching = continueWatchingConfig[profile];

  return (
    <div className="continue-watching-row">
      <h2 className="row-title">Continue Watching for {profile}</h2>
      <div className="card-row">
        {continueWatching.map((pick, index) => (
          <Link to={pick.link} key={index} className="pick-card">
            <img src={pick.imgSrc} alt={pick.title} className="pick-image" />
            <div className="overlay">
              <div className="pick-label">{pick.title}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ContinueWatching;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard';
import SplineViewer from '../components/SplineViewer';
import blueImage from '../images/blue.png';
import redImage from '../images/red.png';
import yellowImage from '../images/yellow.png';
import greyImage from '../images/grey.png';
import './browse.css';

const SPLINE_URL = 'https://my.spline.design/nexbotrobotcharacterconceptforpersonaluse-ABbfTCXAkIulvE46geZHQMFx/';
type Profile = { name: string; image: string; route: string; backgroundGif?: string };

const Browse: React.FC = () => {
  const navigate = useNavigate();

  const profiles: Profile[] = [
    {
      name: "academia",
      image: yellowImage,
      route: "/profile/academia",
      backgroundGif: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdDExa2V0amxvZXU5aDh3ZzRyMHduem5wYmE3MXZrZGxjMDZob253cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/cRMgB2wjHhVN2tDD2z/giphy.gif"
    },
    {
      name: "recruiter",
      image: blueImage,
      route: "/profile/recruiter",
      backgroundGif: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTZ5eWwwbjRpdWM1amxyd3VueHhteTVzajVjeGZtZGJ1dDc4MXMyNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9dg/16u7Ifl2T4zYfQ932F/giphy.gif"
    },
    {
      name: "explorer",
      image: redImage,
      route: "/profile/explorer",
      backgroundGif: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGNidDl5emZpejY2eGFxa2I4NW0zZGNpbWRlbnBrZ3N2dWhhbzM1MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TFPdmm3rdzeZ0kP3zG/giphy.gif"
    },
    {
      name: "Prof. Mees",
      image: greyImage,
      route: "/research/mees",
    },
  ];

  const handleProfileClick = (profile: Profile) => {
    if (profile.backgroundGif) {
      navigate(profile.route, { state: { profileImage: profile.image, backgroundGif: profile.backgroundGif } });
    } else {
      navigate(profile.route);
    }
  };

  return (
    <div className="browse-container">
      <SplineViewer url={SPLINE_URL} className="browse-spline-bg" />

      <div className="spline-watermark-cover" />

      <div className="browse-content">
        <p className="who-is-watching">Who's Watching?</p>
        <div className="profiles">
          {profiles.map((profile, index) => (
            <ProfileCard
              key={index}
              name={profile.name}
              image={profile.image}
              onClick={() => handleProfileClick(profile)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;

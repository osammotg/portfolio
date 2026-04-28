import React, { useEffect, useState } from 'react';
import './NetflixTitle.css';
import netflixSound from './netflix-sound.mp3';
import { useNavigate } from 'react-router-dom';
import logoImage from '../src/images/logo-2.png';

const NetflixTitle = () => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const handlePlaySound = () => {
    if (isClicked) return;
    const audio = new Audio(netflixSound);
    audio.play().catch(error => console.error("Audio play error:", error));
    setIsClicked(true);
  };

  useEffect(() => {
    if (isClicked) {
      const timer = setTimeout(() => {
        navigate('/browse');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isClicked, navigate]);

  return (
    <div className="netflix-container" onClick={handlePlaySound}>
      <img
        src={logoImage}
        alt="Custom Logo"
        className={`netflix-logo ${isClicked ? 'animate' : 'idle'}`}
      />
      {!isClicked && (
        <p className="tap-hint">tap to enter</p>
      )}
    </div>
  );
};

export default NetflixTitle;

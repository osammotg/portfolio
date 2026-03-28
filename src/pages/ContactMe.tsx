import React from 'react';
import './ContactMe.css';
import profilePic from '../images/mahbod.jpg';
import { FaEnvelope, FaPhoneAlt, FaCoffee, FaLinkedin } from 'react-icons/fa';
import { ContactMe as IContactMe } from '../types';

const ContactMe: React.FC = () => {

  const fallbackData: IContactMe = {
    profilePicture: { url: '' },
    name: 'Mahbod Tajdini',
    title: 'Data Science Student',
    summary: 'Analytical and research-focused Data Scientist with a strong background in Artificial Intelligence and ongoing Master’s studies in Data Science at Universität Zürich, with academic affiliation to ETH Zürich.',
    companyUniversity: 'Universität Zürich | ETH Zürich',
    linkedinLink: 'https://www.linkedin.com/in/mahbodtajdini/',
    email: 'mahbod@mahbodtajdini.com',
    phoneNumber: '+41 78 447 88 87'
  };
  const displayData = fallbackData;

  return (
    <div className="contact-container">
      <div className="linkedin-badge-custom">
        <img src={profilePic} alt={displayData.name} className="badge-avatar" />
        <div className="badge-content">
          <h3 className="badge-name">{displayData.name}</h3>
          <p className="badge-title">{displayData.title}</p>
          <p className="badge-description">
            {displayData.summary}
          </p>
          <p className="badge-company">{displayData.companyUniversity}</p>
          <a
            href={displayData.linkedinLink}
            target="_blank"
            rel="noopener noreferrer"
            className="badge-link"
          >
            <FaLinkedin className="linkedin-icon" /> View Profile
          </a>
        </div>
      </div>
      <div className="contact-header">
        <p>I'm always up for a chat or a coffee! Feel free to reach out.</p>
      </div>
      <div className="contact-details">
        <div className="contact-item">
          <FaEnvelope className="contact-icon" />
          <a href={`mailto:${displayData.email}`} className="contact-link">
            {displayData.email}
          </a>
        </div>
        <div className="contact-item">
          <FaPhoneAlt className="contact-icon" />
          <a href={`tel:${displayData.phoneNumber}`} className="contact-link">
            {displayData.phoneNumber}
          </a>
        </div>
        <div className="contact-fun">
          <p>Or catch up over a coffee ☕</p>
          <FaCoffee className="coffee-icon" />
        </div>
      </div>
    </div>
  );
};

export default ContactMe;

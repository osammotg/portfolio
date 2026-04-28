import React from 'react';
import './ContactMe.css';
import { FaEnvelope, FaPhoneAlt, FaCoffee, FaLinkedin } from 'react-icons/fa';

const ContactMe: React.FC = () => {
  const data = {
    name: 'Tommaso Gazzini',
    title: 'Robotics Engineer & Entrepreneur',
    summary: 'MSc Mechanical Engineering at ETH Zurich (focus: Robotics & AI). Co-founder of Striker. PX Engineer at Lovable. Swiss-Italian, 6 languages.',
    companyUniversity: 'ETH Zurich | Lovable.dev',
    linkedinLink: 'https://linkedin.com/in/tommaso-gazzini-2b5517253',
    email: 'tom.gazzini@gmail.com',
    phoneNumber: '+41 76 635 53 54'
  };

  return (
    <div className="contact-container">
      <div className="linkedin-badge-custom">
        <div className="badge-content">
          <h3 className="badge-name">{data.name}</h3>
          <p className="badge-title">{data.title}</p>
          <p className="badge-description">{data.summary}</p>
          <p className="badge-company">{data.companyUniversity}</p>
          <a
            href={data.linkedinLink}
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
          <a href={`mailto:${data.email}`} className="contact-link">
            {data.email}
          </a>
        </div>
        <div className="contact-item">
          <FaPhoneAlt className="contact-icon" />
          <a href={`tel:${data.phoneNumber}`} className="contact-link">
            {data.phoneNumber}
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

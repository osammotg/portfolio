import React from 'react';
import './Recommendations.css';
import { FaLinkedin } from 'react-icons/fa';

const Recommendations: React.FC = () => {
  return (
    <div className="recommendations-page">
      <div className="recommendations-list">
        <div className="recommendation-card" style={{ textAlign: 'center', padding: '48px 32px' }}>
          <FaLinkedin style={{ fontSize: '3rem', color: '#0a66c2', marginBottom: '16px' }} />
          <h3 style={{ marginBottom: '8px' }}>Recommendations on LinkedIn</h3>
          <p style={{ opacity: 0.8, marginBottom: '24px' }}>
            Written recommendations from colleagues and collaborators are available on my LinkedIn profile.
          </p>
          <a
            href="https://linkedin.com/in/tommaso-gazzini-2b5517253"
            target="_blank"
            rel="noopener noreferrer"
            className="badge-link"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <FaLinkedin /> View LinkedIn Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;

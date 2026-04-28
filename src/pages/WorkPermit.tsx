import React from 'react';
import './WorkPermit.css';

const WorkPermit: React.FC = () => {
  return (
    <div className="work-permit-container">
      <div className="work-permit-card">
        <h2 className="work-permit-headline">Work Authorisation</h2>

        <div className="work-permit-flags">
          <div className="flag-item">
            <span className="flag-emoji">🇨🇭</span>
            <span>Swiss</span>
          </div>
          <div className="flag-item">
            <span className="flag-emoji">🇮🇹</span>
            <span>Italian</span>
          </div>
          <div className="flag-item">
            <span className="flag-emoji">🇪🇺</span>
            <span>EU / Schengen</span>
          </div>
        </div>

        <p className="work-permit-summary">
          I hold <strong>Swiss and Italian dual citizenship</strong> and have completed my military
          service with the Swiss Armed Forces (Special Forces Grenadier). I have the unrestricted
          right to work in Switzerland, Italy, and across the entire EU / Schengen area —
          no sponsorship, permit, or visa required.
        </p>

        <div className="work-permit-tags">
          <span className="work-permit-tag">🇨🇭 Switzerland</span>
          <span className="work-permit-tag">🇮🇹 Italy</span>
          <span className="work-permit-tag">🇪🇺 European Union</span>
          <span className="work-permit-tag">No sponsorship needed</span>
          <span className="work-permit-tag">Military service ✓</span>
        </div>

        <p className="additional-info">
          Questions? Reach out at{' '}
          <a href="mailto:tom.gazzini@gmail.com" style={{ color: '#bbb' }}>
            tom.gazzini@gmail.com
          </a>{' '}
          or <strong style={{ color: '#e6e6e6' }}>+41 76 635 53 54</strong>.
        </p>
      </div>
    </div>
  );
};

export default WorkPermit;

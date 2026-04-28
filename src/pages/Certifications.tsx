import React from 'react';
import './Certifications.css';
import { FaExternalLinkAlt, FaUniversity, FaAward, FaRobot } from 'react-icons/fa';

import { Certification } from '../types';

const iconData: { [key: string]: { icon: JSX.Element; color: string } } = {
  university: { icon: <FaUniversity />, color: '#6aa9ff' },
  award: { icon: <FaAward />, color: '#f5b700' },
  robotics: { icon: <FaRobot />, color: '#b388ff' },
};

const fallbackCertifications: Certification[] = [
  {
    title: 'MSc Mechanical Engineering',
    issuer: 'ETH Zurich',
    issuedDate: 'Sep 2027 (expected)',
    link: 'https://ethz.ch',
    iconName: 'university'
  },
  {
    title: 'BSc Microengineering',
    issuer: 'EPFL',
    issuedDate: 'Jun 2024',
    link: 'https://epfl.ch',
    iconName: 'university'
  },
  {
    title: 'Robot Learning — MDPs, IL, RL, VLAs',
    issuer: 'ETH Zurich',
    issuedDate: '2026',
    link: 'https://ethz.ch',
    iconName: 'robotics'
  },
  {
    title: 'Intro to Machine Learning (8 credits)',
    issuer: 'ETH Zurich',
    issuedDate: '2025',
    link: 'https://ethz.ch',
    iconName: 'university'
  },
  {
    title: 'StartHack 2024 — Syngenta Challenge',
    issuer: 'StartGlobal / EPFL',
    issuedDate: 'Mar 2024',
    link: 'https://starthack.eu',
    iconName: 'award'
  },
  {
    title: 'Swiss Special Forces Grenadier (Isone)',
    issuer: 'Swiss Armed Forces',
    issuedDate: '2021',
    link: 'https://www.armee.ch/en',
    iconName: 'award'
  }
];

const getIssuerIconData = (cert: Certification) => {
  return iconData[cert.iconName] || iconData['university'];
};

const getCertificationSection = (cert: Certification) => {
  const issuer = (cert.issuer || '').toLowerCase();
  if (issuer.includes('eth')) return 'ETH Zurich';
  if (issuer.includes('epfl')) return 'EPFL';
  if (issuer.includes('armed') || issuer.includes('swiss')) return 'Other';
  return 'Other';
};

const Certifications: React.FC = () => {
  const sections = fallbackCertifications.reduce<Record<string, Certification[]>>((acc, cert) => {
    const section = getCertificationSection(cert);
    if (!acc[section]) acc[section] = [];
    acc[section].push(cert);
    return acc;
  }, {});

  const sectionOrder = ['ETH Zurich', 'EPFL', 'Other'].filter((s) => sections[s]?.length);

  return (
    <div className="certifications-container">
      {sectionOrder.map((section) => (
        <div key={section} className="certification-section">
          <h3 className="certification-section-title">{section}</h3>
          <div className="certifications-grid">
            {sections[section].map((cert, index) => {
              const iconDataForCard = getIssuerIconData(cert);
              const CardTag = cert.link ? 'a' : 'div';
              return (
                <CardTag
                  href={cert.link || undefined}
                  key={`${section}-${index}`}
                  target={cert.link ? '_blank' : undefined}
                  rel={cert.link ? 'noopener noreferrer' : undefined}
                  className="certification-card"
                  style={{ '--delay': `${index * 0.08}s` } as React.CSSProperties}
                >
                  <div className="certification-content">
                    <div className="certification-icon" style={{ color: iconDataForCard.color }}>
                      {iconDataForCard.icon}
                    </div>
                    <h3>{cert.title}</h3>
                    <p>{cert.issuer}</p>
                    {cert.issuedDate && <span className="issued-date">Issued {cert.issuedDate}</span>}
                  </div>
                  {cert.link && (
                    <div className="certification-link animated-icon">
                      <FaExternalLinkAlt />
                    </div>
                  )}
                </CardTag>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Certifications;

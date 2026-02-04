import React from 'react';
import './Achievements.css';

const achievements = [
  {
    heading: 'Academic Distinctions',
    items: [
      {
        text: 'Earned a BSc in Artificial Intelligence from Vrije Universiteit Amsterdam, graduating cum laude and ranking within the top 8% of the cohort.',
        date: 'Jul 2025',
        logo: undefined
      },
      {
        text: 'Completed the International Baccalaureate Diploma Programme, achieving a ranking within the top 3% of students worldwide.',
        date: 'May 2022',
        logo: undefined
      }
    ]
  },
  {
    heading: 'University of Waterloo - CEMC (Canadian Computing Competition)',
    items: [
      {
        text: 'Received a Certificate of Distinction from the University of Waterloo for placing within the top 25% of contestants worldwide in the Canadian Computing Competition.',
        date: 'Dec 2020',
        logo: undefined
      },
      {
        text: 'Achieved first place nationally in Iran in the Canadian Computing Competition organized by the University of Waterloo.',
        date: 'Dec 2020',
        logo: undefined
      }
    ]
  },
  {
    heading: 'World Robot Olympiad (WRO)',
    items: [
      {
        text: 'Achieved first place in the Football Category at the Iran National Selection Competition of the World Robot Olympiad.',
        date: 'Oct 2019',
        logo: undefined
      },
      {
        text: 'Achieved first place in the Football Category at the Iran National Selection Competition of the World Robot Olympiad for a second consecutive year.',
        date: 'Oct 2018',
        logo: undefined
      },
      {
        text: 'Placed 16th in the Football Category at the World Robot Olympiad International Finals held in Costa Rica.',
        date: 'Dec 2017',
        logo: undefined
      },
      {
        text: 'Achieved second place in the Football Category at the Iran National Selection Competition of the World Robot Olympiad.',
        date: 'Oct 2017',
        logo: undefined
      }
    ]
  }
];


const Achievements: React.FC = () => {
  return (
    <div className="achievements-page">
      <div className="achievements-card">
        {achievements.map((section) => (
          <div key={section.heading} className="achievements-section">
            <h3 className="section-title">{section.heading}</h3>
            <div className="achievements-grid">
              {section.items.map((item, index) => (
                <div key={`${section.heading}-${index}`} className="achievement-card">
                  <p className="achievement-text">{item.text}</p>
                  <span className="achievement-date">{item.date}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;

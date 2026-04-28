import React from 'react';
import './Achievements.css';

const achievements = [
  {
    heading: 'Academic & Research',
    items: [
      {
        text: 'Admitted to MSc Mechanical Engineering at ETH Zurich (focus: Robotics & AI) — visited Prof. Roland Siegwart in person to pitch directly. One of the most competitive engineering master\'s programmes in Europe.',
        date: 'Sep 2024',
      },
      {
        text: 'Graduated with a BSc in Microengineering from EPFL — École Polytechnique Fédérale de Lausanne.',
        date: 'Jun 2024',
      },
      {
        text: 'Achieved 87% success rate on SO-101 bimanual arm in MuJoCo using DAgger (iterative imitation learning), up from 73% with behavioural cloning baseline. Submitted to the goal-conditioned leaderboard.',
        date: 'Dec 2025',
      },
      {
        text: 'Achieved 90% success rate on transfer cube task and 50% on bimanual insertion using ACT (Action Chunking with Transformers) on real hardware at ETH Robotics Club.',
        date: 'Mar 2026',
      },
      {
        text: 'Optimised YAMS teleoperation system from ~30Hz to 120Hz (4x speedup) through cProfile-guided multithreading and critical bug fixes in the observation pipeline.',
        date: 'Jan 2026',
      }
    ]
  },
  {
    heading: 'Entrepreneurship',
    items: [
      {
        text: 'Raised CHF 15,000 from football-industry angels for Striker — a football match organising app with 3,000+ registered players in Zurich.',
        date: '2025',
      },
      {
        text: 'Sold 60% stake in FuzeFoot (1,000+ members, 350+ games organised) for 5,000 EUR, retaining the Zurich user base and codebase to bootstrap Striker.',
        date: 'Jun 2024',
      },
      {
        text: 'Co-founded Elysium Sarl — a Geneva-based software factory that shipped apps for municipalities, medical companies, and local businesses. Clients include the Commune de Bardonnex (3-year contract) and Let\'sMed.',
        date: '2021',
      }
    ]
  },
  {
    heading: 'Hackathons',
    items: [
      {
        text: 'Built CropSight at StartHack 2024 (EPFL, Lausanne) for the Syngenta Challenge — an AI-powered farming assistant with personalised biological product recommendations, farmer app with WhatsApp/SMS alerts, and a company analytics dashboard.',
        date: 'Mar 2024',
      },
      {
        text: 'Organised multiple hackathons in San Francisco as a consulting business, including events for Zeabur and Stack Auth (YC-backed).',
        date: 'Sep 2024',
      }
    ]
  },
  {
    heading: 'Sports & Military',
    items: [
      {
        text: 'Passed selection for the Swiss Special Forces Grenadiers (Isone) — one of the most demanding physical and psychological assessments in the Swiss Armed Forces.',
        date: '2020',
      },
      {
        text: '12 years of competitive water polo at national team level — developed elite teamwork, resilience, and discipline under pressure.',
        date: '2010 - 2022',
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

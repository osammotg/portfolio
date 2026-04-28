import React from 'react';
import TimelinePage from '../components/TimelinePage';
import { TimelineItem } from '../types';

import ethzLogo from '../images/logos/ethz.png';
import epflLogo from '../images/logos/epfl.png';

const educationTimeline: TimelineItem[] = [
  {
    timelineType: 'education',
    name: 'ETH Zurich',
    title: "Master's in Mechanical Engineering 🎓",
    link: 'https://ethz.ch',
    logo: ethzLogo,
    summaryPoints: [
      '🎊 Pursuing a Master\'s in Mechanical Engineering at ETH Zurich, focused on Robotics, Computer Vision, and Machine Learning (AI).',
      '📐 Coursework in autonomous robotics, sequential convexification for autonomous systems, and deep learning-based image analysis.',
      '🤖 Active in the ETH Robotics Club — Robot Learning Team: bimanual teleoperation, ACT policy learning, VLA models, Unitree G1 humanoid.',
    ],
    dateRange: '2024 - Present'
  },
  {
    timelineType: 'education',
    name: 'EPFL — École Polytechnique Fédérale de Lausanne',
    title: 'Bachelor in Microengineering 🎓',
    link: 'https://epfl.ch',
    logo: epflLogo,
    summaryPoints: [
      '🎊 Graduated with a Bachelor in Microengineering from EPFL.',
      '🛠️ Hands-on robotics and coding projects using Python and C++.',
    ],
    dateRange: '2020 - 2023'
  },
  {
    timelineType: 'education',
    name: 'Saint-Petersburg State University',
    title: 'Exchange Semester 🌍',
    summaryPoints: [
      '🌍 Self-organised exchange semester in Russia — achieved fluency in Russian during this period.',
    ],
    dateRange: 'Mar 2018 - Aug 2018'
  }
];

const Education: React.FC = () => {
  return <TimelinePage title="🎓 Education Timeline" items={educationTimeline} />;
};

export default Education;

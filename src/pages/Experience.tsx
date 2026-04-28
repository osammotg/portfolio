import React from 'react';
import TimelinePage from '../components/TimelinePage';
import { TimelineItem } from '../types';

import lovableLogo from '../images/logos/lovable.png';
import ethrcLogo from '../images/logos/ethrc.jpeg';
import stackAuthLogo from '../images/logos/stack-auth.png';
import ycLogo from '../images/logos/yc.png';
import strikerLogo from '../images/logos/striker.png';
import letsMedLogo from '../images/logos/letsmeds.png';

type DisplayTimelineItem = TimelineItem & { theme?: 'primary' };

const experienceTimeline: DisplayTimelineItem[] = [
  {
    timelineType: 'research',
    name: 'ETH Robotics Club — Robot Learning Team',
    title: 'Robot Learning Developer 🤖',
    link: 'https://www.ethrobotics.ch/',
    logo: ethrcLogo,
    projectKey: 'yams',
    summaryPoints: [
      '🔬 Hardware integration and deployment of robotic systems, including a bimanual teleoperation setup and the Unitree G1 humanoid, working with robotic hardware and Vision-Language-Action (VLA) models.',
      'Implemented and tuned YAMS — bimanual teleoperation running at 120Hz (4x speedup via multithreading), 3 synchronised camera streams.',
      'Implemented ACT (Action Chunking with Transformers): 90% success rate on transfer cube task.',
      'Designed Polaris — full ML data pipeline for world model fine-tuning on NVIDIA H100 cluster.',
    ],
    dateRange: 'Sep 2025 - Present'
  },
  {
    timelineType: 'work',
    name: 'Stack Auth (YC S24)',
    title: 'Software Engineer & Hackathon Organiser 🏆',
    link: 'https://stack-auth.com',
    logo: stackAuthLogo,
    badgeLogo: ycLogo,
    summaryPoints: [
      '⭐ Developed authentication infrastructure features for an open-source startup backed by YCombinator, including implementation of the Model Context Protocol (MCP).',
      'Organised and led 4 hackathons to gather real-time feedback from developers, accelerating iteration of newly released features.',
    ],
    dateRange: 'Sep 2025 - Dec 2025'
  },
  {
    timelineType: 'work',
    name: 'Lovable.dev',
    title: 'PX Engineering Intern 🛠️',
    link: 'https://lovable.dev',
    logo: lovableLogo,
    summaryPoints: [
      '🚀 Product Experience Engineering internship at Lovable — the AI coding platform with 3M+ users. Hybrid role spanning support engineering, user research, and product improvement.',
      'Analysed and resolved customer support tickets; conducted user research interviews with power users to identify systematic AI failure patterns.',
      'Proposed and designed Goal Clarification Mode ("Cupidon" / GCM): auto-triggers on user frustration, pauses code changes, asks 3–5 clarifying questions, produces a scoped plan before resuming.',
      'Automated support workflows: credit refund pipeline using Fin/Intercom, reducing 120+ hours of manual work.',
    ],
    dateRange: 'Aug 2025'
  },
  {
    timelineType: 'work',
    name: 'Striker (previously FuzeFoot)',
    title: 'Co-founder ⚽',
    link: 'https://striker.app',
    logo: strikerLogo,
    summaryPoints: [
      '🚀 Developed a platform to find and organise football games in Geneva, Zurich & Paris.',
      'Managed technical development, community building, and full-cycle project management.',
      '2,500+ members and 500+ organised games.',
      'Tech stack: ReactJS, Python, WordPress, MySQL, PHP.',
    ],
    dateRange: '2022 - Present'
  },
  {
    timelineType: 'work',
    name: 'Lets-Med',
    title: 'AI Workflow Automation 🤖',
    link: 'https://lets-med.com',
    logo: letsMedLogo,
    summaryPoints: [
      '📁 Expanded a website contract into an AI platform digitising thousands of medical devices.',
    ],
    dateRange: '2024'
  },
  {
    timelineType: 'work',
    name: 'Elysium Sarl',
    title: 'Software Engineering Internship 💻',
    link: 'https://elysium-sarl.ch',
    summaryPoints: [
      '🏗️ Software development internship at Geneva-based software factory. Shipped custom apps and websites for local businesses and municipalities.',
    ],
    dateRange: 'Oct 2023 - Dec 2023'
  },
  {
    timelineType: 'teaching',
    name: 'ARA',
    title: 'Teaching Assistant 🧑‍🏫',
    summaryPoints: [
      '📚 Private tutoring and teaching assistance across maths, sciences, and programming.',
    ],
    dateRange: '2016 - 2023'
  }
];

const Experience: React.FC = () => {
  return <TimelinePage title="💼 Experience Timeline" items={experienceTimeline} />;
};

export default Experience;

import React from 'react';
import TimelinePage from '../components/TimelinePage';
import { TimelineItem } from '../types';

type DisplayTimelineItem = TimelineItem & { theme?: 'primary' };

const experienceTimeline: DisplayTimelineItem[] = [
  {
    timelineType: 'work',
    name: 'ETH Robotics Club (ETHRC) - Aeronautics',
    title: 'Perception Engineer 👀',
    link: 'https://www.ethrobotics.ch/',
    summaryPoints: [
      '🧪 Working with the Aeronautics team at ETHRC, where we use autonomous FPV racing drones to push the limits of high-speed aerial robotics. Contributing to the perception stack by developing real-time visual-inertial odometry (VIO), gate detection, state estimation, Kalman filtering, sensor fusion, and motion capture to support environment perception, localization, and autonomous navigation in dynamic environments.'
    ],
    dateRange: 'Apr 2026 - Present'
  },
    {
    timelineType: 'research',
    name: 'ETH Zürich - Computer Vision and Geometry Group (CVG)',
    title: 'Graduate Student Researcher 👨🏽‍🔬',
    link: 'https://cvg.ethz.ch/',
    summaryPoints: [
      '🧪 Working on state-of-the-art dynamic SLAM through the HERMES SLAM project, under the supervision of Dániel Béla Baráth at the Computer Vision and Geometry Group (CVG). The research focuses on integrating semantic scene graph representations into deep visual SLAM by extending DROID-SLAM in the Wild (DROID-W) with structured scene-level reasoning, aiming to improve reconstruction efficiency and robustness in unconstrained environments.'
    ],
    dateRange: 'Mar 2026 - Present'
  },
  {
    timelineType: 'research',
    name: 'ETH Zürich - Ecosystem and Landscape Evolution Group (ELE)',
    title: 'Research Assistant 👨🏽‍🔬',
    link: 'https://ele.ethz.ch/',
    summaryPoints: [
      '🧪 Supporting the development of WildInSync, an initiative for global biodiversity monitoring that combines environmental DNA, remote sensing, and AI to generate standardized data for conservation research and decision-making.'
    ],
    dateRange: 'Mar 2026 - Present'
  },
  {
    timelineType: 'research',
    name: 'EPFL - Signal Processing Laboratory (LTS4)',
    title: 'Visiting Student Researcher 👨🏽‍🔬',
    link: 'https://www.epfl.ch/labs/lts4/',
    summaryPoints: [
      '🧪 Conducting research on scalable cell-graph representations for digital pathology, focusing on batch-effect–robust graph construction, edge enhancement with tissue context, and graph diversity to improve generalization.',
      'Investigating multimodal foundation-model approaches that combine cell graphs and vision models, exploring efficient fine-tuning strategies and curated large-scale datasets for robust zero-shot and transfer learning.'
    ],
    dateRange: 'Feb 2026 - Present'
  },
  {
    timelineType: 'teaching',
    name: 'ETH Zürich - Ecosystem and Landscape Evolution Group (ELE)',
    title: 'Teaching Assistant 🧑🏽‍🏫',
    link: 'https://www.vvz.ethz.ch/Vorlesungsverzeichnis/lerneinheit.view?semkez=2026S&ansicht=ALLE&lerneinheitId=201478&lang=en',
    summaryPoints: [
      '📚 Serving as a Teaching Assistant for Environmental Systems Data Science: Machine Learning (701-3003-00L) under the supervision of Prof. Dr. Loïc Pellissier and Dr. Camille Pierre Albouy.'
    ],
    dateRange: 'Jan 2026 - Present'
  },
  {
    timelineType: 'work',
    name: 'Analytics Club at ETH Zürich',
    title: 'Hack4Good Organizing Staff 🖥️',
    link: 'https://www.analytics-club.org/hack4good',
    summaryPoints: [
      '🤝 Supporting the operations of Hack4Good, an 8-week pro-bono program connecting ETH Zürich students with non-profit organizations to develop data-driven solutions for social causes.',
      'Assisting in facilitating partnerships with non-profit organizations to source impactful, real-world data challenges.',
      'Providing direct guidance and resources to student teams throughout the project lifecycle.',
      'Executing logistics for workshops and events focused on data science skills and project management.',
      'Contributing to the evaluation of project outcomes to assess alignment with social impact objectives of partner organizations.'
    ],
    dateRange: 'Nov 2025 - Present'
  },
  {
    timelineType: 'work',
    name: 'Forward·Inc',
    title: 'Student AI Consultant 🤵🏽‍♂️',
    link: 'https://www.newcomersforward.com/get-involved/',
    summaryPoints: [
      '📁 Providing research, analysis, and practical recommendations for a mission-driven organization. Review programs, analyze data, and support strategic planning efforts. Collaborate with team members to improve operations, strengthen services, and support organizational goals.'
    ],
    dateRange: 'Jan 2026 - Mar 2026'
  },
  {
    timelineType: 'teaching',
    name: 'UZH Department of Informatics',
    title: 'Head Teaching Assistant 🧑🏽‍🏫',
    link: 'https://www.ifi.uzh.ch/en/seal/teaching/courses/info1.html',
    summaryPoints: [
      '📚 Served as Head Teaching Assistant for Informatics I (22AINF02) under the supervision of Prof. Dr. Harald Gall and Dr. Carol Alexandru, leading the teaching assistant team and managing teaching operations, exercise design, and assessment processes to ensure high-quality student learning support and effective course delivery.'
    ],
    dateRange: 'Sep 2025 - Dec 2025'
  },
  {
    timelineType: 'research',
    name: 'Vrije Universiteit Amsterdam (VU Amsterdam) - Sports Intelligence Lab (SIL)',
    title: 'Research Assistant 👨🏽‍🔬',
    link: 'https://sportsintelligencelab.com/',
    summaryPoints: [
      '🧪 Collaborating with Dr. Mauricio Verano Merino at the Sports Intelligence Lab (SIL) on multiple research projects, applying data-driven approaches in computer science and sports analytics.',
      'Conducted data-driven research on ball recovery in professional football, including exploration of machine learning applications in professional football.',
      'Analyzed large-scale educational data to evaluate the effects of Generative AI tools on student outcomes in programming courses.'
    ],
    dateRange: 'Jun 2025 - Mar 2026'
  },
  {
    timelineType: 'research',
    name: 'Forward Football',
    title: 'AI Research Intern 👨🏽‍🔬',
    link: 'https://forward.football/',
    summaryPoints: [
      '🧪 Analyzed large-scale spatiotemporal datasets to model player interactions, quantify team performance, and derive data-driven tactical insights.'
    ],
    dateRange: 'Sep 2024 - Jun 2025'
  },
  {
    timelineType: 'teaching',
    name: 'Vrije Universiteit Amsterdam (VU Amsterdam)',
    title: 'Teaching Assistant Mentor 🧑🏽‍🏫',
    link: 'https://vu.nl/en',
    summaryPoints: [
      '📚 Served as a mentor for new teaching assistants at VU Amsterdam, guiding them through the transition into instructional roles. Designed and delivered interactive workshops, developed training materials, and provided personalized feedback to support their growth in both confidence and teaching effectiveness.'
    ],
    dateRange: 'Aug 2024 - Jun 2025'
  },
  {
    timelineType: 'volunteer',
    name: 'World Robot Olympiad (WRO) Netherlands',
    title: 'Judge at the National WRO competitions of Netherlands 🤖',
    link: 'https://wro-association.org/',
    summaryPoints: [
      '🧑🏽‍⚖️ Served as a judge at the National World Robot Olympiad (WRO) competitions held in the Netherlands, where I evaluated student robotics projects and supported fair competition standards at the national level.'
    ],
    dateRange: 'Jun 2023 - Jul 2023'
  },
  {
    timelineType: 'teaching',
    name: 'Vrije Universiteit Amsterdam (VU Amsterdam)',
    title: 'Head Teaching Assistant 🧑🏽‍🏫',
    link: 'https://vu.nl/en',
    summaryPoints: [
      '📚 Served as the Head TA for the Computational Thinking course (X_400475) for BSc. Artificial Intelligence students, in collaboration with Dr. Aniel Bhulai. Oversaw and supported the course delivery for two academic years, each spanning approximately two months.'
    ],
    dateRange: 'Oct 2023 - Dec 2024'
  },
  {
    timelineType: 'teaching',
    name: 'Vrije Universiteit Amsterdam (VU Amsterdam)',
    title: 'Teaching Assistant 🧑🏽‍🏫',
    link: 'https://vu.nl/en',
    summaryPoints: [
      '📚 Served as a Teaching Assistant for multiple courses across the Faculty of Science and the Honors Program, primarily within the Computer Science and Artificial Intelligence departments.',
      'Assisted in Introduction to Python Programming (XB_0082) (2023, 2024).',
      'Assisted in The Impact of Algorithms on Human Lives - Honors course (X_HP015) (2024).',
      'Assisted in Project Intelligent Systems (X_401076) (2024).',
      'Assisted in Dynamic Modelling (XB_0036) (2024).',
      'Assisted in Human-Computer Interaction (XB_0013) (2024, 2025).',
      'Assisted in Applied Programming (XB_0102) (2024, 2025).',
      'Assisted in Machine Learning (X_400154) (2024).',
      'Assisted in Project Conversational Agents (XB_0101) (2025).'
    ],
    dateRange: 'Apr 2023 - Jun 2025'
  },
  {
    timelineType: 'work',
    name: 'Vrije Universiteit Amsterdam (VU Amsterdam)',
    title: 'Voting Member of the Program Committee 🤝🏽',
    link: 'https://vu.nl/en',
    summaryPoints: [
      '⭐ Elected student representative and official voting member of the Program Committee for the BSc Artificial Intelligence program. Acted as the primary point of contact for AI students, collecting feedback and concerns regarding course content, teaching quality, and overall program structure.'
    ],
    dateRange: 'Oct 2022 - Jun 2025'
  },
  {
    timelineType: 'work',
    name: 'Vrije Universiteit Amsterdam (VU Amsterdam)',
    title: 'International Student Ambassador 🌍',
    link: 'https://vu.nl/en',
    summaryPoints: [
      '⭐ Selected by VU Amsterdam to represent the BSc. Artificial Intelligence program at key events and outreach initiatives. Acted as the face of the university during information sessions, student panels, and open days, as well as engaging with prospective students and their families, both locally and internationally.'
    ],
    dateRange: 'Oct 2022 - Jun 2025'
  },
  {
    timelineType: 'work',
    name: 'Baridsoft | برید سامانه نوین',
    title: 'Information Technology Intern 💻',
    link: 'https://baridsoft.net/',
    summaryPoints: [
      '👷🏽‍♂️ Completed a hands-on internship focused on computer systems, network infrastructure, and IT support. Gained practical experience in troubleshooting hardware and software issues, configuring network devices, and assisting in maintaining internal systems.'
    ],
    dateRange: 'Jun 2021 - Aug 2021'
  },
  {
    timelineType: 'work',
    name: 'University of Tehran',
    title: 'Captain of the Students Robotic Team 🤖',
    link: 'https://me.ut.ac.ir/introduction',
    summaryPoints: [
      '🚀 Led the Student Robotics Team at the University of Tehran as a Team Captain, representing the university in the World Robot Olympiad (WRO) at both national and international levels. Oversaw project planning, robot design, programming, and team coordination.',
      'Ranked among the Top 16 teams worldwide at the 2017 WRO International Finals in Costa Rica.'
    ],
    dateRange: 'Jan 2017 - Nov 2019'
  }
];

const Experience: React.FC = () => {
  return <TimelinePage title="💼 Experience Timeline" items={experienceTimeline} />;
};

export default Experience;

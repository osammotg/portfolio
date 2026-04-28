import { ProjectHeroCardProps } from '../components/ProjectHeroCard';

import fuzefootVideo from '../images/fuzefoot-demo.mp4';
import yamsImage from '../images/yams-robot.jpg';
import paperclipImage from '../images/paperclip.jpg';
import cropsightImage from '../images/starthack.jpg';
import starthack2Image from '../images/starthack2.jpg';
import lockinVideo from '../images/lockin-demo.mp4';

export const projectsData: Record<string, ProjectHeroCardProps> = {
  fuzefoot: {
    images: [],
    video: fuzefootVideo,
    category: 'startup',
    title: 'FuzeFoot',
    subtitle: 'Co-founder · 2022 – 2024 · Geneva & Zurich',
    description:
      'Football match organising app — predecessor to Striker. Players found and joined pick-up games in Geneva and Zurich. Published on App Store and Play Store.',
    badges: ['iOS + Android', 'App Store', 'Play Store'],
    stats: [
      { value: '1,000+', label: 'Members' },
      { value: '350+', label: 'Games' },
      { value: '5k€', label: 'Stake sold' },
    ],
    tech: ['React Native', 'WordPress', 'PHP', 'MySQL'],
    links: [
      { label: 'fuzefoot.com', href: 'https://fuzefoot.com', icon: 'external', primary: true },
    ],
    story: [
      { heading: 'Origin', text: 'Built in 2022 to replace WhatsApp group chaos for Geneva pick-up football. Mobile-first from day one — React Native app cross-compiled to iOS and Android.' },
      { heading: 'Traction', text: '1,000+ registered players, 350+ games organised. Expanded from Geneva to Zurich within 18 months of launch.' },
      { heading: 'Exit', text: 'Sold a 60% stake for 5,000 EUR, then pivoted the remaining concept into a full rebuild — Striker — with a paid-entry model and a new brand.' },
      { heading: 'Tech', text: 'React Native for the cross-platform app, WordPress + PHP REST API backend, MySQL database, custom admin panel for venue and game management.' },
    ],
    accent: '#ff6b1a',
    imagePosition: 'center center',
  },
  yams: {
    images: [yamsImage],
    category: 'side-project',
    title: 'YAMS & Polaris',
    subtitle: 'ETH Robotics Club · Sep 2025 – Present',
    description:
      'Bimanual teleoperation and robot learning system. YAMS runs at 120 Hz (4× speedup via multithreading) with 3 synchronised camera streams. ACT policy achieves 90% on the transfer-cube task.',
    badges: ['Robot Learning', 'ETH Zürich', 'VLA', 'Current'],
    stats: [
      { value: '120 Hz', label: 'Control loop' },
      { value: '90%', label: 'ACT success' },
      { value: '3', label: 'Camera streams' },
    ],
    tech: ['Python', 'PyTorch', 'LeRobot', 'CAN Bus', 'ROS', 'Kubernetes', 'AWS EKS'],
    links: [
      { label: 'ETH Robotics Club', href: 'https://www.ethrobotics.ch/', icon: 'external', primary: true },
      { label: 'GitHub', href: 'https://github.com/osammotg', icon: 'github' },
    ],
    story: [
      { heading: 'YAMS', text: 'Yet Another Manipulation System — bimanual teleoperation setup. Multithreaded architecture reduced control latency from 480 Hz single-thread bottleneck to a stable 120 Hz across both arms.' },
      { heading: 'ACT Policy', text: 'Implemented Action Chunking with Transformers on the bimanual setup. 90% success rate on the transfer-cube benchmark after fine-tuning on in-house demonstrations.' },
      { heading: 'Polaris', text: 'Full ML data pipeline for world model fine-tuning on the ETH NVIDIA H100 cluster — dataset preprocessing, training orchestration, and eval loops.' },
      { heading: 'Hardware', text: 'ETHRC custom bimanual arms (branded ETHRC), 3-camera synchronised video capture, CAN Bus motor control, ROS for sensor fusion and arm coordination.' },
    ],
    accent: '#8058ff',
    imagePosition: 'center 40%',
  },
  paperclip: {
    images: [paperclipImage],
    category: 'side-project',
    title: 'Paperclip',
    subtitle: 'Used as operator · 2024',
    description:
      "Paperclip is a well-known AI company OS — I didn't build it, I used it. I deployed it to automate Striker's growth: prospecting leads, managing outreach, and running operational workflows autonomously so I could focus on product.",
    badges: ['AI Automation', 'Growth Ops', 'Agentic Workflows'],
    stats: [
      { value: '27', label: 'API routes' },
      { value: '7', label: 'Adapters' },
    ],
    tech: ['Paperclip', 'AI Agents', 'Workflow Automation', 'No-code'],
    links: [
      { label: 'GitHub', href: 'https://github.com/osammotg', icon: 'github', primary: true },
    ],
    story: [
      { heading: 'Why I used it', text: "Striker was growing but I was a solo operator. I used Paperclip to automate lead generation — finding football players, club admins, and venue partners who could join the platform — without hiring a growth team." },
      { heading: 'The experiment', text: 'I configured AI agents to run outreach, qualify leads, and surface the best contacts. The goal: manage a company autonomously so I could stay focused on engineering and product.' },
      { heading: 'What happened', text: 'It failed. The leads were low quality and the automation added friction rather than removing it. But the potential was obvious — autonomous company ops is a real problem that AI will eventually solve.' },
      { heading: 'The takeaway', text: 'This experience shaped how I think about agentic systems. The same architecture that struggles with sales ops is the one I now study in robotics — an agent that perceives state, reasons, and takes actions in the world.' },
    ],
    accent: '#2196f3',
    imagePosition: 'center center',
  },
  cropsight: {
    images: [cropsightImage, starthack2Image],
    category: 'hackathon',
    title: 'CropSight',
    subtitle: 'StartHack 2024 · Syngenta Challenge',
    description:
      'AI-powered farming assistant built in 36 hours for the Syngenta challenge at StartHack 2024. Crop conditions + environmental data → personalised biological product recommendations.',
    badges: ['Hackathon', 'StartHack 2024', 'AgriTech', 'AI/ML'],
    stats: [
      { value: '36h', label: 'Built in' },
      { value: 'Top 5', label: 'Challenge rank' },
    ],
    tech: ['Python', 'AI/ML', 'React', 'WhatsApp API', 'SMS API', 'TTS'],
    links: [
      { label: 'GitHub', href: 'https://github.com/osammotg', icon: 'github', primary: true },
    ],
    story: [
      { heading: 'Challenge', text: 'Syngenta brief: help smallholder farmers select the right biological crop protection products with minimal literacy requirements and no reliable internet.' },
      { heading: 'Farmer app', text: 'WhatsApp / SMS interface for farmers — text-to-speech output for low-literacy users. Sends personalised product recommendations based on local environmental and crop data.' },
      { heading: 'Company dashboard', text: 'Web dashboard for Syngenta field reps showing market penetration analytics, recommendation acceptance rates, and regional crop health trends.' },
      { heading: 'AI layer', text: 'ML model ingesting weather, soil, crop stage, and pest-risk data to rank biological products by predicted efficacy. Fine-tuned on Syngenta agronomic datasets.' },
    ],
    accent: '#4caf50',
    imagePosition: 'center 35%',
  },
  lockin: {
    images: [],
    video: lockinVideo,
    category: 'side-project',
    title: 'LockIn',
    subtitle: 'Side project · 2024 · San Francisco',
    description:
      "While in San Francisco I noticed most people struggled to stay focused at their computer. I built a small ML tool that automatically detects whether you're focused or not — camera-based, runs entirely in-browser.",
    badges: ['Computer Vision', 'Machine Learning', 'Productivity', 'Web App'],
    tech: ['TypeScript', 'React', 'TensorFlow.js', 'Facemesh', 'Convex'],
    links: [
      { label: 'Try it live', href: 'https://focus-data.vercel.app/', icon: 'external', primary: true },
      { label: 'GitHub', href: 'https://github.com/osammotg', icon: 'github' },
    ],
    story: [
      { heading: 'Idea', text: "Built for personal use: a Pomodoro-style focus timer that actually knows if you're looking at the screen — no manual start/stop needed." },
      { heading: 'Vision', text: 'TensorFlow.js Facemesh model runs entirely in-browser — no server round-trips. 468 facial landmarks track pupil position to determine gaze direction.' },
      { heading: 'Backend', text: 'Convex real-time database stores session history, streak data, and productivity analytics. Sync across tabs instantly.' },
      { heading: 'UX', text: "Red panda mascot reacts to focus state — alert when you're on task, disappointed when you drift. Gamified streaks and daily focus goals." },
    ],
    accent: '#00bcd4',
    imagePosition: 'center center',
  },
};

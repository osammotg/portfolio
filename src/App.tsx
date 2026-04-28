import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NetflixTitle from './NetflixTitle';
import ProfilePage from './profilePage/profilePage';
import Browse from './browse/browse';
import WorkPermit from './pages/WorkPermit';
import Experience from './pages/Experience';
import Education from './pages/Education';
import Recommendations from './pages/Recommendations';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import ContactMe from './pages/ContactMe';
import Layout from './Layout';
import Music from './pages/Music';
import Reading from './pages/Reading';
import Certifications from './pages/Certifications';
import Achievements from './pages/Achievements';
import Publications from './pages/Publications';
import MeesPage from './research/mees/MeesPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<NetflixTitle />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/research/mees" element={<Layout><MeesPage /></Layout>} />
      <Route path="/profile/:profileName" element={<Layout><ProfilePage /></Layout>} />
      <Route path="/work-permit" element={<Layout><WorkPermit /></Layout>} />
      <Route path="/experience" element={<Layout><Experience /></Layout>} />
      <Route path="/education" element={<Layout><Education /></Layout>} />
      <Route path="/work-experience" element={<Layout><Experience /></Layout>} />
      <Route path="/recommendations" element={<Layout><Recommendations /></Layout>} />
      <Route path="/skills" element={<Layout><Skills /></Layout>} />
      <Route path="/projects" element={<Layout><Projects /></Layout>} />
      <Route path="/contact-me" element={<Layout><ContactMe /></Layout>} />
      <Route path="/music" element={<Layout><Music /></Layout>} />
      <Route path="/reading" element={<Layout><Reading /></Layout>} />
      <Route path="/certifications" element={<Layout><Certifications /></Layout>} />
      <Route path="/achievements" element={<Layout><Achievements /></Layout>} />
      <Route path="/publications" element={<Layout><Publications /></Layout>} />
    </Routes>
  );
};

export default App;

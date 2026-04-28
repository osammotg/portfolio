import React from 'react';
import './ProfileBanner.css';
import PlayButton from '../components/PlayButton';
import MoreInfoButton from '../components/MoreInfoButton';

type ProfileType = 'recruiter' | 'explorer' | 'academia';

interface ProfileBannerProps {
  profile: ProfileType;
}

const fallbackContent: Record<
  ProfileType,
  { headline: string; summary: string; resumeUrl: string; linkedinUrl: string }
> = {
  recruiter: {
    headline: 'Tommaso Gazzini — Robotics Engineer & Entrepreneur',
    summary: 'MSc Mechanical Engineering student at ETH Zurich (focus: Robotics & AI). PX Engineer at Lovable (AI coding platform, 3M+ users). Co-founder of Striker — a football match organising app with 3,000+ players in Zurich and CHF 15k raised from football-industry angels. Swiss-Italian, 6 languages. Former Swiss Special Forces Grenadier. I build things that work — from autonomous robot learning systems to consumer apps used daily.',
    resumeUrl: '/Tommaso_Gazzini_CV.pdf',
    linkedinUrl: 'https://linkedin.com/in/tommaso-gazzini-2b5517253'
  },
  explorer: {
    headline: 'Tommaso Gazzini — Builder & Founder',
    summary: 'Serial entrepreneur and robotics engineer. Founded Striker (3k+ users, CHF 15k raised), co-founded FuzeFoot (sold), and built Elysium Sarl — a Swiss software factory shipping apps for municipalities, medical companies, and startups. Currently studying how robots learn at ETH Zurich and shipping product at Lovable. 12 years competitive water polo. 6 languages. Always building.',
    resumeUrl: '/Tommaso_Gazzini_CV.pdf',
    linkedinUrl: 'https://linkedin.com/in/tommaso-gazzini-2b5517253'
  },
  academia: {
    headline: 'Tommaso Gazzini — Robotics Researcher',
    summary: 'MSc Mechanical Engineering at ETH Zurich (focus: Robotics & AI). Research in robot learning and Vision Language Actions at the ETH Robotics Club — implementing ACT (Action Chunking with Transformers) for bimanual manipulation with 90% success rate on transfer cube tasks. Designed the Polaris data pipeline for world model fine-tuning. Targeting semester project on VLAs at the ETH Robot Learning Lab.',
    resumeUrl: '/Tommaso_Gazzini_CV.pdf',
    linkedinUrl: 'https://linkedin.com/in/tommaso-gazzini-2b5517253'
  }
};

const ProfileBanner: React.FC<ProfileBannerProps> = ({ profile }) => {
  const { headline, summary: profileSummary, resumeUrl, linkedinUrl } = fallbackContent[profile];

  const handleResumeClick = () => {
    if (!resumeUrl) return;
    window.open(resumeUrl, '_blank', 'noopener,noreferrer');
  };

  const handleLinkedinClick = () => {
    if (!linkedinUrl) return;
    window.open(linkedinUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="profile-banner">
      <div className="banner-content">
        <h1 className="banner-headline" id='headline'>{headline}</h1>
        <p className="banner-description">
          {profileSummary}
        </p>

        <div className="banner-buttons">
          <PlayButton onClick={handleResumeClick} label="Read CV" />
          <MoreInfoButton onClick={handleLinkedinClick} label="LinkedIn" />
        </div>
      </div>
    </div>
  );
};

export default ProfileBanner;

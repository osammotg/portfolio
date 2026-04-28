import React, { useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {
  FaStar as StarIcon,
  FaBriefcase as WorkIcon,
  FaGraduationCap as SchoolIcon,
  FaHandsHelping as VolunteerIcon,
  FaFlask as ResearchIcon,
  FaChalkboardTeacher as TeachingIcon,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa';
import './TimelinePage.css';
import { TimelineItem } from '../types';
import ProjectHeroCard from './ProjectHeroCard';
import { projectsData } from '../data/projects';

type DisplayTimelineItem = TimelineItem & { theme?: 'primary' };

interface TimelinePageProps {
  title: string;
  items: DisplayTimelineItem[];
}

const TimelinePage: React.FC<TimelinePageProps> = ({ title, items }) => {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const toggleProject = (key: string) =>
    setExpandedProject(prev => (prev === key ? null : key));

  return (
    <div className="timeline-page">
      <div className="timeline-container">
        <h2 className="timeline-title">{title}</h2>
      </div>
      <VerticalTimeline className="timeline">
        {items.map((item, index) => {
          const isPrimary = item.timelineType === 'work' && item.theme === 'primary';
          const isWork = item.timelineType === 'work';
          const isResearch = item.timelineType === 'research';
          const isVolunteer = item.timelineType === 'volunteer';
          const isTeaching = item.timelineType === 'teaching';
          const normalizedDateRange = `${item.dateRange || ''}`
            .toLowerCase()
            .replace(/[\u2013\u2014]/g, '-');
          const isCurrent = normalizedDateRange.includes('present')
            || normalizedDateRange.includes('current')
            || normalizedDateRange.includes('ongoing')
            || normalizedDateRange.includes('now');
          const workColors = {
            card: isCurrent ? 'rgb(12, 42, 92)' : 'rgb(245, 245, 245)',
            icon: isCurrent ? 'rgb(12, 42, 92)' : 'rgb(33, 150, 243)',
            arrow: isCurrent ? '7px solid rgb(12, 42, 92)' : '7px solid rgb(245, 245, 245)',
            border: isCurrent ? '1px solid rgba(12, 42, 92, 0.75)' : '1px solid transparent',
            text: isCurrent ? '#f8fbff' : '#111'
          };
          const researchColors = {
            card: isCurrent ? 'rgb(58, 24, 86)' : 'rgb(236, 230, 255)',
            icon: isCurrent ? 'rgb(58, 24, 86)' : 'rgb(128, 88, 255)',
            arrow: isCurrent ? '7px solid rgb(58, 24, 86)' : '7px solid rgb(236, 230, 255)',
            border: isCurrent ? '1px solid rgba(58, 24, 86, 0.7)' : '1px solid transparent',
            text: isCurrent ? '#f7f0ff' : '#111'
          };
          const volunteerColors = {
            card: 'rgb(255, 238, 217)',
            icon: 'rgb(230, 126, 34)',
            arrow: '7px solid rgb(255, 238, 217)',
            border: '1px solid transparent',
            text: '#111'
          };
          const teachingColors = {
            card: isCurrent ? 'rgb(114, 26, 38)' : 'rgb(255, 228, 232)',
            icon: isCurrent ? 'rgb(114, 26, 38)' : 'rgb(214, 74, 88)',
            arrow: isCurrent ? '7px solid rgb(114, 26, 38)' : '7px solid rgb(255, 228, 232)',
            border: isCurrent ? '1px solid rgba(114, 26, 38, 0.7)' : '1px solid transparent',
            text: isCurrent ? '#fff4f6' : '#111'
          };
          const educationColors = {
            card: isCurrent ? 'rgb(255, 105, 180)' : 'rgb(255, 226, 236)',
            icon: isCurrent ? 'rgb(255, 105, 180)' : 'rgb(255, 160, 200)',
            arrow: isCurrent ? '7px solid rgb(255, 105, 180)' : '7px solid rgb(255, 226, 236)',
            border: isCurrent ? '1px solid rgba(255, 105, 180, 0.8)' : '1px solid transparent',
            text: isCurrent ? '#ffffff' : '#111'
          };
          const selectedColors = isWork
            ? workColors
            : isResearch
              ? researchColors
              : isVolunteer
                ? volunteerColors
                : isTeaching
                  ? teachingColors
                  : educationColors;
          const contentBackground = isPrimary ? 'rgb(33, 150, 243)' : selectedColors.card;
          const contentBorder = isPrimary ? '1px solid transparent' : selectedColors.border;
          const contentColor = isPrimary ? '#0f0f0f' : selectedColors.text;
          const arrowColor = isPrimary ? '7px solid rgb(33, 150, 243)' : selectedColors.arrow;
          const iconBackground = isPrimary ? 'rgb(33, 150, 243)' : selectedColors.icon;
          const summaryPoints = Array.isArray(item.summaryPoints)
            ? item.summaryPoints
            : [item.summaryPoints];
          const viewLabel = item.timelineType === 'education'
            ? 'View Institution'
            : item.timelineType === 'research' || item.timelineType === 'teaching'
              ? 'View Organisation'
              : 'View Company';

          const cardBody = (
            <div className="timeline-card">
              <div className="timeline-card-header">
                <div className="timeline-card-titles">
                  {item.timelineType === 'work' || isVolunteer || isResearch || isTeaching ? (
                    <>
                      <h3 className="vertical-timeline-element-title">{item.title}</h3>
                      <h4 className="vertical-timeline-element-subtitle">{item.name}</h4>
                    </>
                  ) : (
                    <>
                      <h3 className="vertical-timeline-element-title">{item.name}</h3>
                      <h4 className="vertical-timeline-element-subtitle">{item.title}</h4>
                    </>
                  )}
                </div>
                {item.logo && (
                  <div className="timeline-logo-wrapper">
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="timeline-company-logo"
                    />
                    {item.badgeLogo && (
                      <img
                        src={item.badgeLogo}
                        alt="badge"
                        className="timeline-logo-badge"
                      />
                    )}
                  </div>
                )}
              </div>
              <ul className="timeline-points">
                {summaryPoints.map((point, pointIndex) => (
                  <li key={pointIndex} className="timeline-point">
                    {point}
                  </li>
                ))}
              </ul>
              <div className="timeline-card-footer">
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="timeline-view-btn"
                  >
                    {viewLabel} ↗
                  </a>
                )}
                {item.projectKey && projectsData[item.projectKey] && (
                  <button
                    className="timeline-project-btn"
                    onClick={() => toggleProject(item.projectKey!)}
                  >
                    {expandedProject === item.projectKey
                      ? <><FaChevronUp /> Hide project</>
                      : <><FaChevronDown /> View project</>}
                  </button>
                )}
              </div>

              {item.projectKey && expandedProject === item.projectKey && projectsData[item.projectKey] && (
                <div className="timeline-project-embed">
                  <ProjectHeroCard {...projectsData[item.projectKey]} />
                </div>
              )}
            </div>
          );

          return (
            <VerticalTimelineElement
              key={index}
              className={`vertical-timeline-element--${item.timelineType}`}
              contentStyle={
                { background: contentBackground, color: contentColor, border: contentBorder }
              }
              contentArrowStyle={
                { borderRight: arrowColor }
              }
              date={item.dateRange}
              iconStyle={
                { background: iconBackground, color: '#fff' }
              }
              icon={
                item.timelineType === 'work'
                  ? <WorkIcon />
                  : isResearch
                    ? <ResearchIcon />
                    : isVolunteer
                      ? <VolunteerIcon />
                      : isTeaching
                        ? <TeachingIcon />
                        : <SchoolIcon />
              }
            >
              {cardBody}
            </VerticalTimelineElement>
          );
        })}
        <VerticalTimelineElement
          iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
          icon={<StarIcon />}
        />
      </VerticalTimeline>
    </div>
  );
};

export default TimelinePage;

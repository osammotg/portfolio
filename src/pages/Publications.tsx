import React from 'react';
import './Publications.css';
import { FaBookOpen, FaExternalLinkAlt } from 'react-icons/fa';

type Publication = {
  title: string;
  authors: React.ReactNode;
  venue: string;
  year: string;
  summary: string;
  link?: string;
};

const researchInterests = `
My research interests span three distinct yet complementary areas: robot perception, computer vision and machine learning, and data-driven bioinformatics. 
I am passionate about developing intelligent perceptual systems for autonomous robots, advancing machine learning techniques for visual understanding, and applying computational approaches to biological data analysis.
I aspire to pursue doctoral research that allows me to contribute to these transformative fields.
`;

const publications: Publication[] = [
  {
    title: 'Capitalising on Football Data with Machine Learning: A Literature Review',
    authors: 'Dionysios Kyriazopoulos, Mahbod Tajdini, Mauricio Verano Merino',
    venue: 'ACM Computing Surveys (ACM CSUR)',
    year: '2026',
    summary: 'Under Review',
  },
  {
    title: 'The Clash of Codes: From Peer-to-Peer Duplication to AI-Generation in Introductory Programming Assignments',
    authors: (
      <>
        Jose Maria Zuarte Reis Claver<sup>*</sup>,{" "}
        Mahbod Tajdini<sup>*</sup>,{" "}
        Mauricio Verano Merino
        <p><sup>*</sup>Equal contribution</p>
      </>
    ),
    venue: 'International Conference on Software Engineering (ICSE) - SEET Track',
    year: '2026',
    summary: 'Published',
    link: 'https://doi.org/10.1145/3786580.3786955',
  },
  {
    title: 'Programming Lego MINDSTORMS Robots using NI LabVIEW®',
    authors: 'Pooyan Nayyeri, Mahbod Tajdini',
    venue: 'eBook',
    year: '2022',
    summary: 'Open-access eBook',
    link: 'https://pnnayyeri.github.io/contents/labview_book_en.pdf',
  }
];

const Publications: React.FC = () => {
  return (
    <div className="publications-page">
      <header className="publications-hero">
        <div className="publications-hero-content">
          <p className="publications-kicker">Publications &amp; Research Interest</p>
          <h1>Publications &amp; Research Interest</h1>
          <p className="publications-intro">{researchInterests.trim()}</p>
        </div>
      </header>

      <section className="publications-section">
        <div className="publications-grid">
          {publications.map((publication, index) => {
            const CardTag = publication.link ? 'a' : 'div';
            return (
              <CardTag
                key={`${publication.title}-${index}`}
                className="publication-card"
                href={publication.link || undefined}
                target={publication.link ? '_blank' : undefined}
                rel={publication.link ? 'noopener noreferrer' : undefined}
              >
                <div className="publication-header">
                  <div className="publication-icon">
                    <FaBookOpen />
                  </div>
                  <div className="publication-meta">
                    <span className="publication-venue">{publication.venue}</span>
                    <span className="publication-year">{publication.year}</span>
                  </div>
                </div>
                <h2 className="publication-title">{publication.title}</h2>
                <p className="publication-authors">{publication.authors}</p>
                <p className="publication-summary">{publication.summary}</p>
                {publication.link && (
                  <span className="publication-link">
                    View Publication <FaExternalLinkAlt />
                  </span>
                )}
              </CardTag>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Publications;

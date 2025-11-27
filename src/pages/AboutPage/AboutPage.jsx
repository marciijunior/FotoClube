import React from 'react';
import IntroSection from './IntroSection';
import MembersSection from './MembersSection';
import HistorySection from './HistorySection';
import './AboutPage.css'; 

function AboutPage() {
  return (
    <div className="about-page-wrapper">
      <IntroSection />
      <MembersSection />
      <HistorySection />
    </div>
  );
}

export default AboutPage;
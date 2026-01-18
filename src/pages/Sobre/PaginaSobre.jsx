import React from 'react';
import SecaoIntro from './SecaoIntro';
import SecaoMembros from './SecaoMembros';
import SecaoHistoria from './SecaoHistoria';
import './PaginaSobre.css'; 

function PaginaSobre() {
  return (
    <div className="about-page-wrapper">
      <SecaoIntro />
      <SecaoMembros />
      <SecaoHistoria />
    </div>
  );
}

export default PaginaSobre;
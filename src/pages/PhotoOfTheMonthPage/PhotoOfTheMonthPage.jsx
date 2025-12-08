// src/pages/PhotoOfTheMonthPage/PhotoOfTheMonthPage.jsx
import React from "react";
import { slidesData } from "../../data/slidesData";
import { pastWinnersData } from "../../data/pastWinnersData";
import "./PhotoOfTheMonthPage.css";
import HeroSection from "./HeroSection";
import FilmstripSection from "./FilmstripSection";
import ArchiveSection from "./ArchiveSection";
import RulesSection from "./RulesSection";

function PhotoOfTheMonthPage() {
  const mainWinner = slidesData[0];
  const runnersUp = slidesData.slice(1, 9);
  const placeholderImage = "/src/assets/images/placeholder-winner.png";

  return (
    <div className="potm-container">
      <HeroSection winner={mainWinner} placeholderImage={placeholderImage} />

      <FilmstripSection
        runnersUp={runnersUp}
        placeholderImage={placeholderImage}
      />

      <ArchiveSection
        pastWinners={pastWinnersData}
        placeholderImage={placeholderImage}
      />

      <RulesSection />
    </div>
  );
}

export default PhotoOfTheMonthPage;
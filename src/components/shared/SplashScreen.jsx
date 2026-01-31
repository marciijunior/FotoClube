import React, { useState, useEffect } from "react";
import "./SplashScreen.css";
import logo from "../../assets/logo-fotoclube.png";

function SplashScreen({ onFinish }) {
  const [show, setShow] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Mostra o logo
    const t1 = setTimeout(() => setShow(true), 100);
    // Inicia fade out
    const t2 = setTimeout(() => setFadeOut(true), 2000);
    // Finaliza após fade out completo
    const t3 = setTimeout(() => onFinish(), 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onFinish]);

  return (
    <div className={`splash-screen ${fadeOut ? "fade-out" : ""}`}>
      <div className={`splash-logo-wrap ${show ? "show" : ""}`}>
        <img src={logo} alt="FotoClube" className="splash-logo" />
      </div>
    </div>
  );
}

export default SplashScreen;

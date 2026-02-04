// src/components/layout/AppLayout.jsx
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SplashScreen from "../shared/SplashScreen";
import ScrollToTop from "../shared/ScrollToTop";
import "./AppLayout.css";

const AppLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [showSplash, setShowSplash] = useState(isHomePage);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  return (
    <>
      <ScrollToTop />
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
      <Header isHomePage={isHomePage} />

      <main className={`app-main-content ${isHomePage ? "is-home-page" : ""}`}>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default AppLayout;

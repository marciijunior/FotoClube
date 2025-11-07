// src/components/layout/AppLayout.jsx
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
// REMOVIDO: AuthProvider
import './AppLayout.css'; 

const AppLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    // REMOVIDO: Wrapper <AuthProvider>
    <> 
      <Header isHomePage={isHomePage} />
      
      <main className={`app-main-content ${isHomePage ? 'is-home-page' : ''}`}>
        <Outlet />
      </main>
      
      <Footer />
    </>
    // REMOVIDO: Wrapper </AuthProvider>
  );
};

export default AppLayout;
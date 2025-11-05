// src/components/layout/AppLayout.jsx
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { AuthProvider } from '../../context/AuthProvider.jsx';
import './AppLayout.css'; 

const AppLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <AuthProvider>
      <> 
        {/* --- (MODIFICAÇÃO) ---
            Agora passamos a prop 'isHomePage' para o Header,
            para que ele saiba como se deve comportar.
        */}
        <Header isHomePage={isHomePage} />
        {/* --- (FIM DA MODIFICAÇÃO) --- */}
        
        <main className={`app-main-content ${isHomePage ? 'is-home-page' : ''}`}>
          <Outlet />
        </main>
        
        <Footer />
      </>
    </AuthProvider>
  );
};

export default AppLayout;
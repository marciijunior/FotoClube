// src/components/layout/AppLayout.jsx
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { AuthProvider } from '../../context/AuthProvider.jsx';
import './AppLayout.css'; 

const AppLayout = () => {
  const location = useLocation();

  // --- (MODIFICAÇÃO) ---
  // 1. Definimos quais páginas não devem ter o padding-top.
  const fullBleedPages = ['/', '/sobre']; 
  
  // 2. Verificamos se a página atual está nessa lista.
  const isFullBleedPage = fullBleedPages.includes(location.pathname);
  // --- (FIM DA MODIFICAÇÃO) ---

  return (
    <AuthProvider>
      <> 
        <Header />
        
        {/* 3. Usamos a nova variável para aplicar a classe */}
        <main className={`app-main-content ${isFullBleedPage ? 'is-home-page' : ''}`}>
          <Outlet />
        </main>
        
        <Footer />
      </>
    </AuthProvider>
  );
};

export default AppLayout;
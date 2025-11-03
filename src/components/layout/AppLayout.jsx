// src/components/layout/AppLayout.jsx
import { Outlet, useLocation } from 'react-router-dom'; // 1. Importa o useLocation
import Header from './Header';
import Footer from './Footer';
import { AuthProvider } from '../../context/AuthProvider.jsx';
import './AppLayout.css'; // 2. Importa o AppLayout.css

const AppLayout = () => {
  // 3. Verifica qual é a página atual
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <AuthProvider>
      <> 
        <Header />
        
        {/* 4. Adiciona classes ao <main>
          - 'app-main-content' aplica o padding-top
          - 'is-home-page' é usada pelo AppLayout.css para REMOVER o padding
        */}
        <main className={`app-main-content ${isHomePage ? 'is-home-page' : ''}`}>
          <Outlet />
        </main>
        
        {/* 5. CORREÇÃO: O Footer agora aparece em TODAS as páginas */}
        <Footer />
      </>
    </AuthProvider>
  );
};

export default AppLayout;
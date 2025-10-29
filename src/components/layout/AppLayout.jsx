// src/components/layout/AppLayout.jsx
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { AuthProvider } from '../../context/AuthProvider.jsx'; // Importe o AuthProvider

// Remova a importação do AppLayout.css se ele não for mais necessário
// import './AppLayout.css';

const AppLayout = () => {
  return (
    <AuthProvider>
      <div className="app-container"> {/* Pode manter este wrapper se quiser */}
        <Header />
        {/* --- REVERSÃO AQUI --- */}
        <main> {/* Remove a classe "app-main-content" */}
          <Outlet />
        </main>
        {/* --- FIM DA REVERSÃO --- */}
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default AppLayout;
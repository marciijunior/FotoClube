import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { AuthProvider } from '../../context/AuthProvider.jsx'; // 1. Importe o AuthProvider

const AppLayout = () => {
  return (
    // 2. Envolva todo o layout com o AuthProvider
    <AuthProvider>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </AuthProvider>
  );
};

export default AppLayout;
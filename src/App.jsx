import { Outlet, useLocation } from 'react-router-dom'; // 1. Importe o useLocation
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

function App() {
  const location = useLocation(); // 2. Pegue a localização atual
  const isHomePage = location.pathname === '/'; // 3. Verifique se é a página inicial

  // 4. Defina o estilo do <main> dinamicamente
  const mainStyle = {
    flex: 1,
    // Se for a HomePage, não aplica padding. Caso contrário, aplica 20px.
    padding: isHomePage ? '0' : '20px' 
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={mainStyle}> {/* 5. Aplique o estilo dinâmico aqui */}
        <Outlet />
      </main>
      {/* O Footer não deve aparecer na HomePage, que é tela cheia */}
      {!isHomePage && <Footer />}
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}

export default App;
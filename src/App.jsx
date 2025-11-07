import { Outlet, useLocation } from 'react-router-dom'; 
// REMOVIDO: ToastContainer e seu CSS
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

function App() {
  const location = useLocation(); 
  const isHomePage = location.pathname === '/'; 

  const mainStyle = {
    flex: 1,
    // Se for a HomePage, não aplica padding. Caso contrário, aplica 20px.
    padding: isHomePage ? '0' : '20px' 
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={mainStyle}> 
        <Outlet />
      </main>
      {/* O Footer não deve aparecer na HomePage, que é tela cheia */}
      {!isHomePage && <Footer />}
      {/* REMOVIDO: <ToastContainer /> */}
    </div>
  );
}

export default App;
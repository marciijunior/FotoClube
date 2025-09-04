import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './Header.css'; // MUDANÇA: Importação direta do CSS

function Header() {
  const { isLoggedIn } = useAuth();

  return (
    // MUDANÇA: classes como strings
    <header className="header">
      <Link to="/home" className="logo"><img src="./src/assets/logo-fotoclube.png"/>
      </Link>
      <nav className="nav">
        <Link to="/eventos" className="nav-link">Eventos</Link>
        <Link to="/sobre" className="nav-link">Sobre Nós</Link>
        <Link to="/contatos" className="nav-link">Contatos</Link>
        {isLoggedIn ? (
          <Link to="/perfil" className="nav-link-highlight">Meu Perfil</Link>
        ) : (
          <Link to="/login" className="nav-link-highlight">Seja Associado</Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
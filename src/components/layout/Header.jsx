// src/components/layout/Header.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth'; // Verifique o caminho
import './Header.css';

function Header() {
  const { isLoggedIn } = useAuth();
  const logoSrc = "./src/assets/logo-fotoclube.png"; // Verifique o caminho

  return (
    <header className="header">
      <Link to="/" className="logo"> {/* Alterado para / para ir para a raiz */}
        <img src={logoSrc} alt="FotoClube Logo"/>
      </Link>
      <nav className="nav">
        <Link to="/eventos" className="nav-link">Eventos</Link>

        {/* --- Dropdown "Concursos" --- */}
        <div className="dropdown">
          <span className="nav-link dropdown-toggle">Concursos</span>
          <div className="dropdown-menu">
            {/* --- MUDANÇA AQUI --- */}
            <Link to="/foto-do-mes" className="dropdown-item">Foto do Mês</Link>
            {/* --- FIM DA MUDANÇA --- */}
            {/* <Link to="/concurso/regulamento" className="dropdown-item">Regulamento</Link> */}
          </div>
        </div>
        {/* --- FIM DO Dropdown --- */}

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
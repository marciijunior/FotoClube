// src/components/layout/Header.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth'; 
import './Header.css';

// --- (Sem alterações aqui) ---
const logoBranco = "./src/assets/logo-fotoclube.png"; 
const logoAzul = "./src/assets/logo-fotoclube-azul.png"; 

function Header({ isHomePage }) {
  const { isLoggedIn } = useAuth();

  const headerClass = `header ${!isHomePage ? 'header-solid' : ''}`;
  const logoSrc = !isHomePage ? logoAzul : logoBranco;
  // --- (Fim) ---

  return (
    <header className={headerClass}>
      <Link to="/" className="logo">
        <img src={logoSrc} alt="FotoClube Logo"/>
      </Link>
      <nav className="nav">
        <Link to="/eventos" className="nav-link">Eventos</Link>

        <div className="dropdown">
          <span className="nav-link dropdown-toggle">Concursos</span>
          <div className="dropdown-menu">
            <Link to="/foto-do-mes" className="dropdown-item">Foto do Mês</Link>
          </div>
        </div>

        <Link to="/sobre" className="nav-link">Sobre Nós</Link>
        <Link to="/contatos" className="nav-link">Contatos</Link>

        {isLoggedIn ? (
          <Link to="/perfil" className="nav-link-highlight">Meu Perfil</Link>
        ) : (
          // --- (MODIFICAÇÃO) O TEXTO DO BOTÃO FOI ALTERADO AQUI ---
          <Link to="/login" className="nav-link-highlight">Seja Associado</Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
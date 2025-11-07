// src/components/layout/Header.jsx
import { Link } from 'react-router-dom';
// O 'useAuth' foi removido, o que está correto.
import './Header.css';

const logoBranco = "./src/assets/logo-fotoclube.png"; 
const logoAzul = "./src/assets/logo-fotoclube-azul.png"; 

function Header({ isHomePage }) {
  // A lógica 'isLoggedIn' foi removida, o que está correto.

  const headerClass = `header ${!isHomePage ? 'header-solid' : ''}`;
  const logoSrc = !isHomePage ? logoAzul : logoBranco;

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

        {/* --- BOTÃO READICIONADO --- */}
        {/* Aqui está o botão "Seja Associado" que você pediu para manter.
          Ele está fixo (não depende de login) e usa o mesmo estilo 'nav-link-highlight'.
          O link "to" aponta para "#" por enquanto.
        */}
        <Link to="#" className="nav-link nav-link-highlight">
          Seja Associado
        </Link>
        {/* --- FIM DA ADIÇÃO --- */}
      </nav>
    </header>
  );
}

export default Header;
// src/components/layout/Header.jsx
import { Link } from 'react-router-dom';
import './Header.css';

// --- MUDANÇA AQUI: Importe as imagens diretamente ---
// Isso garante que o Vite resolva o caminho correto, não importa a página
import logoBranco from '../../assets/logo-fotoclube.png'; 
import logoAzul from '../../assets/logo-fotoclube-azul.png'; 

function Header({ isHomePage }) {
  const headerClass = `header ${!isHomePage ? 'header-solid' : ''}`;
  
  // A lógica permanece a mesma, mas agora usa as variáveis importadas
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

        {/* Botão Seja Associado mantido */}
        <Link to="/contatos" className="nav-link-highlight">
            Seja Associado
        </Link>
      </nav>
    </header>
  );
}

export default Header;
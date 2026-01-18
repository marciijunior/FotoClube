import CarrosselHero from "./CarrosselHero";
import ProximosEventos from "./ProximosEventos";
import SecaoSobre from "./SecaoSobre";
import AtualizacoesEventos from "../Eventos/AtualizacoesEventos";
import SecaoAssociese from "./SecaoAssociese";
import "./PaginaInicial.css";

function PaginaInicial() {
  return (
    <div className="home-container">
      <CarrosselHero />
      <ProximosEventos />
      <SecaoSobre />
      <AtualizacoesEventos limit={8} />
      <SecaoAssociese />
    </div>
  );
}

export default PaginaInicial;

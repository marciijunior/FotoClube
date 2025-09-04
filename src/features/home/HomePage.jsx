import HeroCarousel from './HeroCarousel'; // Caminho atualizado
import "./HomePage.css"; // MUDANÇA: Importação direta do CSS

// Dados de exemplo para o carrossel
const slidesData = [
  {
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb", // Substitua pelas suas imagens
    location: "ARAÇATUBA, SÃO PAULO - BRASIL",
    title: "PARQUE BAGUAÇU",
    author: "Foto tirada por Bianca Santos",
  },
  {
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    location: "SÃO PAULO - BRASIL",
    title: "REPRESA DE GUARAPIRANGA",
    author: "Foto tirada por Carlos Almeida",
  },
  {
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
    location: "MINAS GERAIS - BRASIL",
    title: "SERRA DA CANASTRA",
    author: "Foto tirada por Mariana Lima",
  },
];

function HomePage() {
  // Removemos a lógica de login daqui, pois o Header já cuida disso.
  return (
    <div className="home-container">
      {" "}
      {/* MUDANÇA: className como string */}
      {/* O Header ficará sobre o Carrossel, controlado pelo CSS */}
      <HeroCarousel slides={slidesData} />
    </div>
  );
}

export default HomePage;

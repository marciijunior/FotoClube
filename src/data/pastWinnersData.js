// src/data/pastWinnersData.js

// Importe as imagens dos vencedores anteriores
// SUBSTITUA PELOS CAMINHOS CORRETOS
import pw1 from '../assets/images/past-winner-1.png'; // Exemplo
import pw2 from '../assets/images/past-winner-2.png'; // Exemplo
import pw3 from '../assets/images/past-winner-3.png'; // Exemplo
import pw4 from '../assets/images/past-winner-4.png'; // Exemplo

export const pastWinnersData = [
  {
    id: 'pw1',
    monthWon: 'Setembro 2025',
    photographer: 'Marcos Andrade',
    title: 'Pôr do Sol na Represa',
    image: pw1, // Caminho importado
    judgesNotes: 'Uma composição de cores quentes que captura perfeitamente a tranquilidade do momento.'
  },
  {
    id: 'pw2',
    monthWon: 'Agosto 2025',
    photographer: 'Juliana Costa',
    title: 'Texturas Urbanas',
    image: pw2,
    judgesNotes: 'O contraste entre o concreto e a luz difusa criou uma narrativa visual poderosa.'
  },
  {
    id: 'pw3',
    monthWon: 'Julho 2025',
    photographer: 'Bruno Alves',
    title: 'Olhar Felino',
    image: pw3,
    judgesNotes: 'A profundidade de campo rasa e o foco preciso no olhar do animal são tecnicamente impecáveis.'
  },
  {
    id: 'pw4',
    monthWon: 'Junho 2025',
    photographer: 'Carla Dias',
    title: 'Gota de Orvalho',
    image: pw4,
    judgesNotes: 'Uma macrofotografia que revela um universo de detalhes invisíveis a olho nu.'
  },
];
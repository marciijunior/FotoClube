// src/data/recentActivitiesData.js

// Adicione as atividades mais recentes NO TOPO da lista.
export const recentActivitiesData = [
  // --- NOVAS ATUALIZAÇÕES ---
  {
    id: 'act013',
    category: 'NOVO EVENTO',
    title: 'Workshop: Fotografia de Retrato com Luz Natural',
    description: 'Domine a arte do retrato aproveitando a luz ambiente. Vagas limitadas!',
    // MUDANÇA: URL Picsum diferente
    image: `https://picsum.photos/seed/act013/300/180`,
    link: '/eventos/workshop-retrato-luz-natural',
    timestamp: '2025-10-22',
  },
  {
    id: 'act012',
    category: 'GALERIA',
    title: 'Galeria Atualizada: Cores do Inverno',
    description: 'Explore as tonalidades frias capturadas pelos nossos membros.',
    // MUDANÇA: URL Picsum diferente + grayscale
    image: `https://picsum.photos/seed/act012/300/180?grayscale`,
    link: '/galeria/cores-inverno-2025',
    timestamp: '2025-10-20',
  },
  {
    id: 'act011',
    category: 'ARTIGO',
    title: 'Edição no Lightroom: Dicas Essenciais para Iniciantes',
    description: 'Um guia rápido para começar a editar suas fotos como um profissional.',
    // MUDANÇA: URL Picsum diferente
    image: `https://picsum.photos/seed/act011/300/180`,
    link: '/blog/lightroom-dicas-iniciantes',
    timestamp: '2025-10-19',
  },
  {
    id: 'act010',
    category: 'PASSEIO',
    title: 'Próximo Passeio: Parque Ibirapuera ao Amanhecer',
    description: 'Vamos capturar a magia das primeiras horas do dia no parque.',
    // MUDANÇA: URL Picsum diferente + blur
    image: `https://picsum.photos/seed/act010/300/180?blur=1`,
    link: '/eventos/passeio-ibirapuera-amanhecer',
    timestamp: '2025-10-17',
  },
  {
    id: 'act009',
    category: 'DICA RÁPIDA',
    title: 'Entendendo o Histograma da sua Câmera',
    description: 'Aprenda a ler o histograma para nunca mais errar na exposição.',
    // MUDANÇA: URL Picsum diferente
    image: `https://picsum.photos/seed/act009/300/180`,
    link: '/blog/dica-histograma',
    timestamp: '2025-10-16',
  },
  {
    id: 'act008',
    category: 'NOVO EVENTO',
    title: 'Noite de Crítica Construtiva Online',
    description: 'Partilhe seus trabalhos e receba feedback valioso dos colegas.',
    // MUDANÇA: URL Picsum diferente + grayscale
    image: `https://picsum.photos/seed/act008/300/180?grayscale`,
    link: '/eventos/critica-construtiva-online',
    timestamp: '2025-10-14',
  },
  {
    id: 'act007',
    category: 'ARTIGO',
    title: 'Lentes Prime vs. Zoom: Qual a Melhor Escolha para Si?',
    description: 'Analisamos as vantagens e desvantagens de cada tipo de lente.',
    // MUDANÇA: URL Picsum diferente
    image: `https://picsum.photos/seed/act007/300/180`,
    link: '/blog/lentes-prime-vs-zoom',
    timestamp: '2025-10-13',
  },
  {
    id: 'act006',
    category: 'GALERIA',
    title: 'Nova Galeria: Fotografia Abstrata',
    description: 'Veja como nossos membros exploram formas, cores e texturas.',
    // MUDANÇA: URL Picsum diferente + blur
    image: `https://picsum.photos/seed/act006/300/180?blur=2`,
    link: '/galeria/fotografia-abstrata',
    timestamp: '2025-10-12',
  },
  // --- ATUALIZAÇÕES ANTIGAS (Manter como estão ou adicionar URLs Picsum também) ---
  {
    id: 'act005',
    category: 'NOVO EVENTO',
    title: 'Workshop Noturno de Astrofotografia',
    description: 'Aprenda a capturar as estrelas. Inscrições abertas!',
    image: '/images/activity-astro.jpg', // Pode manter ou trocar
    link: '/eventos/workshop-astro',
    timestamp: '2025-10-11',
  },
  // ... resto das suas atividades antigas ...
];
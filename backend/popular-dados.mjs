import fetch from "node-fetch";

const eventos = [
  {
    title: "Workshop de Fotografia de Rua",
    date: "15, Jan-2025",
    time: "14:00 às 17:00",
    description:
      "Aprenda técnicas avançadas de fotografia de rua com fotógrafos renomados. Explore composição, luz natural e captura de momentos decisivos.",
    location: "Centro Cultural - Rua das Flores, 123",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800",
  },
  {
    title: "Exposição Coletiva 2025",
    date: "20, Fev-2025",
    time: "19:00 às 22:00",
    description:
      "Grande exposição anual com trabalhos dos membros do clube. Mais de 50 fotografias selecionadas em diversas categorias.",
    location: "Galeria de Arte Moderna",
    category: "Exposição",
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800",
  },
  {
    title: "Palestra: Fotografia Documental",
    date: "28, Jan-2025",
    time: "18:30 às 20:30",
    description:
      "Renomado fotojornalista compartilha experiências e técnicas de fotografia documental, ética na fotografia e storytelling visual.",
    location: "Auditório do Clube",
    category: "Reunião",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800",
  },
  {
    title: "Saída Fotográfica - Parque Nacional",
    date: "10, Fev-2025",
    time: "07:00 às 16:00",
    description:
      "Expedição fotográfica ao amanhecer no Parque Nacional. Fotografia de paisagem e vida selvagem. Transporte incluído.",
    location: "Parque Nacional da Serra",
    category: "Passeio",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
  },
  {
    title: "Curso: Lightroom Avançado",
    date: "5, Fev-2025",
    time: "19:30 às 21:30",
    description:
      "Domine técnicas avançadas de edição no Adobe Lightroom. Ajustes seletivos, presets personalizados e workflow profissional.",
    location: "Sala de Informática - Sede do Clube",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800",
  },
  {
    title: "Concurso Temático - Arquitetura Urbana",
    date: "1, Mar-2025",
    time: "20:00",
    description:
      "Concurso mensal com tema arquitetura urbana. Inscrições abertas até 25/02. Premiação para os 3 primeiros lugares.",
    location: "Online - Votação via Website",
    category: "Outros",
    image: "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800",
  },
  {
    title: "Encontro Mensal de Membros",
    date: "22, Jan-2025",
    time: "19:00 às 21:00",
    description:
      "Reunião mensal para discutir projetos, trocar experiências e planejar atividades futuras. Aberto a todos os membros.",
    location: "Sede do FotoClube",
    category: "Reunião",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800",
  },
  {
    title: "Workshop de Retrato em Estúdio",
    date: "15, Fev-2025",
    time: "15:00 às 18:00",
    description:
      "Técnicas de iluminação de estúdio, uso de refletores, softboxes e direção de modelos para retratos profissionais.",
    location: "Estúdio Fotográfico Pro Light",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1554080353-a576cf803bda?w=800",
  },
];

const concursos = [
  {
    title: "Reflexos Urbanos",
    author: "Carlos Silva",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800",
    monthWon: "Dezembro 2024",
    judgesNotes:
      "Composição excepcional explorando reflexos em vidro. O uso de linhas diagonais e a simetria parcial criam uma tensão visual interessante.",
    isWinner: true,
    position: 1,
  },
  {
    title: "Amanhecer na Serra",
    author: "Ana Paula Rodrigues",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    monthWon: "Dezembro 2024",
    judgesNotes:
      "Excelente captura da luz dourada matinal. A névoa adiciona profundidade e mistério à paisagem montanhosa.",
    isWinner: true,
    position: 2,
  },
  {
    title: "Mercado das Cores",
    author: "Roberto Fernandes",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
    monthWon: "Dezembro 2024",
    judgesNotes:
      "Fotografia de rua vibrante. A paleta de cores e a composição documentam perfeitamente a energia do mercado local.",
    isWinner: true,
    position: 3,
  },
  {
    title: "Geometria Natural",
    author: "Marina Costa",
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800",
    monthWon: "Novembro 2024",
    judgesNotes:
      "Macro excepcional de folha. Os padrões naturais e a luz difusa criam uma imagem quase abstrata, destacando a perfeição da natureza.",
    isWinner: true,
    position: 1,
  },
  {
    title: "Retrato em Preto e Branco",
    author: "João Mendes",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    monthWon: "Novembro 2024",
    judgesNotes:
      "Retrato poderoso. O contraste alto e a iluminação lateral revelam textura e emoção, demonstrando domínio técnico.",
    isWinner: true,
    position: 2,
  },
  {
    title: "Abstrato Industrial",
    author: "Patricia Lima",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
    monthWon: "Novembro 2024",
    judgesNotes:
      "Perspectiva única de estrutura industrial. A composição minimalista e as cores frias transmitem modernidade.",
    isWinner: true,
    position: 3,
  },
  {
    title: "Momento Decisivo",
    author: "Fernando Santos",
    image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=800",
    monthWon: "Outubro 2024",
    judgesNotes:
      "Fotografia de rua clássica. Timing perfeito capturando interação humana autêntica em ambiente urbano.",
    isWinner: true,
    position: 1,
  },
  {
    title: "Texturas da Terra",
    author: "Camila Andrade",
    image: "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=800",
    monthWon: "Outubro 2024",
    judgesNotes:
      "Vista aérea impressionante. As texturas e padrões naturais formam uma composição quase pictórica.",
    isWinner: true,
    position: 2,
  },
  {
    title: "Silhueta ao Pôr do Sol",
    author: "Lucas Oliveira",
    image: "https://images.unsplash.com/photo-1495954484750-af469f2f9be5?w=800",
    monthWon: "Outubro 2024",
    judgesNotes:
      "Uso magistral de contraluz. A silhueta e as cores do céu criam uma atmosfera contemplativa.",
    isWinner: true,
    position: 3,
  },
  {
    title: "Arquitetura Moderna",
    author: "Beatriz Almeida",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800",
    monthWon: "Setembro 2024",
    judgesNotes:
      "Perspectiva dramática de edifício moderno. As linhas convergentes e o céu azul profundo enfatizam a grandiosidade.",
    isWinner: true,
    position: 1,
  },
];

async function criarEvento(evento) {
  const mutation = `
    mutation {
      createEvent(
        title: "${evento.title.replace(/"/g, '\\"')}"
        date: "${evento.date}"
        time: "${evento.time}"
        description: "${evento.description.replace(/"/g, '\\"')}"
        location: "${evento.location.replace(/"/g, '\\"')}"
        category: "${evento.category}"
        image: "${evento.image}"
      ) {
        id
        title
      }
    }
  `;

  const response = await fetch("http://localhost:3002/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: mutation }),
  });

  return await response.json();
}

async function criarConcurso(concurso) {
  const mutation = `
    mutation {
      createWinner(
        title: "${concurso.title.replace(/"/g, '\\"')}"
        author: "${concurso.author.replace(/"/g, '\\"')}"
        image: "${concurso.image}"
        monthWon: "${concurso.monthWon}"
        judgesNotes: "${concurso.judgesNotes.replace(/"/g, '\\"')}"
        isWinner: ${concurso.isWinner}
        position: ${concurso.position}
      ) {
        id
        title
      }
    }
  `;

  const response = await fetch("http://localhost:3002/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: mutation }),
  });

  return await response.json();
}

async function popularDados() {
  console.log("🚀 Iniciando população do banco de dados...\n");

  console.log("📅 Criando eventos...");
  for (const evento of eventos) {
    try {
      const result = await criarEvento(evento);
      if (result.errors) {
        console.log(
          `   ❌ Erro ao criar "${evento.title}": ${result.errors[0].message}`
        );
      } else {
        console.log(`   ✅ ${evento.title}`);
      }
    } catch (error) {
      console.log(`   ❌ Erro: ${error.message}`);
    }
  }

  console.log("\n🏆 Criando concursos vencedores...");
  for (const concurso of concursos) {
    try {
      const result = await criarConcurso(concurso);
      if (result.errors) {
        console.log(
          `   ❌ Erro ao criar "${concurso.title}": ${result.errors[0].message}`
        );
      } else {
        console.log(
          `   ✅ ${concurso.title} - ${concurso.author} (${concurso.monthWon})`
        );
      }
    } catch (error) {
      console.log(`   ❌ Erro: ${error.message}`);
    }
  }

  console.log("\n✨ População concluída!");
  console.log(
    `📊 Total: ${eventos.length} eventos e ${concursos.length} concursos criados`
  );
}

popularDados();

import fetch from "node-fetch";

async function limparEventos() {
  console.log("🗑️ Limpando eventos antigos...\n");

  // Buscar todos os eventos
  const query = `
    query {
      allEvents {
        id
        title
      }
    }
  `;

  const response = await fetch("http://localhost:3002/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  const result = await response.json();
  const eventos = result.data?.allEvents || [];

  console.log(`📊 Total de eventos encontrados: ${eventos.length}\n`);

  // Deletar cada evento
  for (const evento of eventos) {
    const mutation = `
      mutation {
        deleteEvent(id: "${evento.id}") {
          id
        }
      }
    `;

    try {
      await fetch("http://localhost:3002/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: mutation }),
      });
      console.log(`   ✅ Deletado: ${evento.title}`);
    } catch (error) {
      console.log(`   ❌ Erro ao deletar ${evento.title}: ${error.message}`);
    }
  }

  console.log("\n✨ Limpeza concluída!\n");
}

limparEventos();

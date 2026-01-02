import fetch from "node-fetch";

async function limparVencedores() {
  console.log("🗑️ Limpando vencedores duplicados...\n");

  // Buscar todos os vencedores
  const query = `
    query {
      allWinners {
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
  const vencedores = result.data?.allWinners || [];

  console.log(`📊 Total de vencedores encontrados: ${vencedores.length}\n`);

  // Deletar cada vencedor
  for (const vencedor of vencedores) {
    const mutation = `
      mutation {
        deleteWinner(id: "${vencedor.id}") {
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
      console.log(`   ✅ Deletado: ${vencedor.title}`);
    } catch (error) {
      console.log(`   ❌ Erro ao deletar ${vencedor.title}: ${error.message}`);
    }
  }

  console.log("\n✨ Limpeza concluída!\n");
}

limparVencedores();

import fetch from "node-fetch";

const adminEmail = "admin@fotoclube.com";
const adminPassword = process.env.ADMIN_PASSWORD;
const adminName = "Admin";
const adminRole = "admin";

if (!adminPassword) {
  throw new Error("Variável de ambiente ADMIN_PASSWORD não definida.");
}

const mutation = `
  mutation {
    createUser(
      email: "${adminEmail}"
      password: "${adminPassword}"
      name: "${adminName}"
      role: "${adminRole}"
    ) {
      id
      email
      name
      role
    }
  }
`;

async function criarAdmin() {
  try {
    const response = await fetch("http://localhost:3002/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: mutation }),
    });

    const result = await response.json();

    if (result.errors) {
      console.error("❌ Erro:", result.errors[0].message);
    } else {
      console.log("✅ Usuário admin criado com sucesso!");
      console.log("📧 Email:", result.data.createUser.email);
      console.log("👤 Nome:", result.data.createUser.name);
      console.log("🔑 Role:", result.data.createUser.role);
      console.log(
        "\n🚀 Você já pode fazer login em http://localhost:5174/login"
      );
    }
  } catch (error) {
    console.error("❌ Erro ao conectar:", error.message);
  }
}

criarAdmin();

import fetch from 'node-fetch';

const mutation = `
  mutation {
    createUser(
      email: "admin@fotoclube.com"
      password: "admin123"
      name: "Admin"
      role: "admin"
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
    const response = await fetch('http://localhost:3002/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: mutation }),
    });

    const result = await response.json();
    
    if (result.errors) {
      console.error('❌ Erro:', result.errors[0].message);
    } else {
      console.log('✅ Usuário admin criado com sucesso!');
      console.log('📧 Email:', result.data.createUser.email);
      console.log('👤 Nome:', result.data.createUser.name);
      console.log('🔑 Role:', result.data.createUser.role);
      console.log('\n🚀 Você já pode fazer login em http://localhost:5174/login');
    }
  } catch (error) {
    console.error('❌ Erro ao conectar:', error.message);
  }
}

criarAdmin();

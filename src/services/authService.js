// A URL base da sua API. No futuro, você substituirá pela URL real.
const API_URL = 'https://api.exemplo.com';

// Função para fazer login
export const loginUser = async (email, password) => {
  // --- SIMULAÇÃO DE API ---
  // Para fins de teste, vamos simular uma chamada bem-sucedida sem um backend real.
  console.log('Simulando chamada de API para login com:', { email, password });
  if (email === 'associado@email.com' && password === 'senha123') {
    // Simula um atraso de 1 segundo, como se fosse uma chamada de rede
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Retorna os dados do usuário como se a API tivesse respondido
    return {
      id: '1',
      name: 'Ana Silva',
      email: 'associado@email.com',
      token: 'jwt-token-falso-aqui'
    };
  } else {
    // Simula um erro
    await new Promise(resolve => setTimeout(resolve, 1000));
    throw new Error('Credenciais inválidas');
  }
  // --- FIM DA SIMULAÇÃO ---

  /*
  // CÓDIGO REAL QUANDO VOCÊ TIVER UM BACKEND:
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data; // Retorna os dados do usuário e o token
  } catch (error) {
    // Lança o erro para que o componente possa tratá-lo
    throw error.response.data.message || 'Erro ao tentar fazer login';
  }
  */
};
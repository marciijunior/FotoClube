import { useAuth } from '../../hooks/useAuth'; // Caminho corrigido para a nova estrutura
import './ProfilePage.css'; // Vamos adicionar um arquivo CSS para estilizar

function ProfilePage() {
  const { user, logout } = useAuth();

  // Se o usuário não estiver carregado ainda (pouco provável, mas é uma boa prática)
  if (!user) {
    return <div>Carregando perfil...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Perfil de {user.name}</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <button onClick={logout} className="logout-button">Sair</button>
      </div>
      <hr />
      <div className="profile-gallery">
        <h3>Minhas Fotos</h3>
        <p>Em breve: galeria de fotos do usuário...</p>
        {/* Aqui virá a lógica de upload e exibição de imagens */}
      </div>
    </div>
  );
}

// A linha mais importante para resolver o erro:
export default ProfilePage;
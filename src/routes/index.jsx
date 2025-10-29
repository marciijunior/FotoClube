// Exemplo de como pode estar seu router
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import HomePage from './features/home/HomePage';
import EventsPage from './pages/EventsPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './features/profile/ProfilePage';
import ProtectedRoute from './components/auth/ProtectedRoute';
// --- MUDANÇA AQUI ---
import PhotoOfTheMonthPage from './pages/PhotoOfTheMonthPage'; // 1. Importa o nome novo

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/home', element: <HomePage /> },
      { path: '/eventos', element: <EventsPage /> },
      { path: '/login', element: <LoginPage /> },
      {
        path: '/perfil',
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      // --- MUDANÇA AQUI ---
      // Pode manter /vencedores ou mudar para /foto-do-mes
      { path: '/vencedores', element: <PhotoOfTheMonthPage /> }, // 2. Usa o componente novo
      // --- Fim da mudança ---

      // Adicione outras rotas (Sobre, Contatos) aqui...
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
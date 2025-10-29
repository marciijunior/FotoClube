// src/routes/index.jsx

import { Routes, Route } from 'react-router-dom';
import App from '../App';
import HomePage from '../features/home/HomePage';
import LoginPage from '../features/authentication/LoginPage';
import ProfilePage from '../features/profile/ProfilePage';
import ProtectedRoute from './ProtectedRoute';
import EventsPage from '../features/events/EventsPage';

// --- 1. ADICIONE A IMPORTAÇÃO DA NOVA PÁGINA AQUI ---
import PhotoOfTheMonthPage from '../pages/PhotoOfTheMonthPage';
// (Verifique se o caminho ../pages/PhotoOfTheMonthPage.jsx está correto)

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="eventos" element={<EventsPage />} />

        {/* --- 2. ADICIONE A NOVA ROTA AQUI --- */}
        <Route path="vencedores" element={<PhotoOfTheMonthPage />} />
        {/* --- FIM DA NOVA ROTA --- */}

        <Route
          path="perfil"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        {/* Adicione outras rotas aqui, como /sobre, etc. */}
      </Route>
    </Routes>
  );
}
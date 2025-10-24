// src/routes/index.jsx

import { Routes, Route } from 'react-router-dom';
import App from '../App';
import HomePage from '../features/home/HomePage';
import LoginPage from '../features/authentication/LoginPage';
import ProfilePage from '../features/profile/ProfilePage';
import ProtectedRoute from './ProtectedRoute';
import EventsPage from '../features/events/EventsPage'; // <-- 1. LINHA ADICIONADA

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="eventos" element={<EventsPage />} /> {/* <-- 2. LINHA ADICIONADA */}
        <Route 
          path="perfil" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
        {/* Adicione outras rotas aqui, como /eventos, /sobre, etc. */}
      </Route>
    </Routes>
  );
}
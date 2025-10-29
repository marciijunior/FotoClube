// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ProtectedRoute from './routes/ProtectedRoute';
import AppLayout from './components/layout/AppLayout.jsx';
import HomePage from './features/home/HomePage';
import LoginPage from './features/authentication/LoginPage';
import ProfilePage from './features/profile/ProfilePage';
import EventsPage from './features/events/EventsPage';
import PhotoOfTheMonthPage from './pages/PhotoOfTheMonthPage'; // Import correto

import './styles/index.css';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: 'login', // Correto (sem /)
        element: <LoginPage />,
      },
      {
        path: 'perfil', // Correto (sem /)
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'eventos', // Correto (sem /)
        element: <EventsPage />,
      },
      // --- MUDANÇA AQUI ---
      {
        path: 'foto-do-mes', // Alterado de 'vencedores'
        element: <PhotoOfTheMonthPage />,
      },
      // --- FIM DA MUDANÇA ---

      // Adicione outras rotas (sobre, contatos) aqui se necessário
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
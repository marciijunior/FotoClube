// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// REMOVIDOS: ProtectedRoute, LoginPage, ProfilePage

import AppLayout from './components/layout/AppLayout.jsx';

// --- MUDANÇAS AQUI ---
import HomePage from './pages/home/HomePage.jsx'; // Caminho atualizado
import PaginaEventos from './pages/Eventos/PaginaEventos.jsx'; // Novo componente
// --- FIM DAS MUDANÇAS ---

import PhotoOfTheMonthPage from './pages/PhotoOfTheMonthPage/PhotoOfTheMonthPage.jsx';
import AboutPage from './pages/AboutPage/AboutPage';

import './styles/index.css';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      // ROTA /login e /perfil REMOVIDAS
      {
        path: 'eventos',
        element: <PaginaEventos />, // Atualizado
      },
      {
        path: 'foto-do-mes',
        element: <PhotoOfTheMonthPage />,
      },
      {
        path: 'sobre',
        element: <AboutPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
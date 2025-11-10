import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AppLayout from './components/layout/AppLayout.jsx';
import HomePage from './pages/Home/HomePage.jsx';
import PhotoOfTheMonthPage from './pages/PhotoOfTheMonthPage/PhotoOfTheMonthPage.jsx';
import AboutPage from './pages/AboutPage/AboutPage.jsx';

// --- CONFIGURAÇÃO PADRÃO ---
// 1. Importa o arquivo PADRÃO (nome genérico)
import PaginaEventos from './pages/Eventos/Calendario.jsx';
// --- FIM DA CONFIGURAÇÃO ---

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
        path: 'eventos',
        // --- CONFIGURAÇÃO PADRÃO ---
        // 2. Renderiza o componente PADRÃO
        element: <PaginaEventos />,
        // --- FIM DA CONFIGURAÇÃO ---
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
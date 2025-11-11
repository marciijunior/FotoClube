import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AppLayout from './components/layout/AppLayout.jsx';
import HomePage from './pages/Home/HomePage.jsx';
import PhotoOfTheMonthPage from './pages/PhotoOfTheMonthPage/PhotoOfTheMonthPage.jsx';
import AboutPage from './pages/AboutPage/AboutPage.jsx';

// --- CORREÇÃO AQUI ---
// O import estava apontando para Calendario.jsx
// O import CORRETO é para PageEventos.jsx
import PaginaEventos from './pages/Eventos/PageEventos.jsx';
// --- FIM DA CORREÇÃO ---

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
        // Isto agora renderiza o PageEventos (que contém Calendario E HistorySection)
        element: <PaginaEventos />,
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
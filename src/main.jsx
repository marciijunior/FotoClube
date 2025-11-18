// src/main.jsx (Atualizado)

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AppLayout from './components/layout/AppLayout.jsx';
import HomePage from './pages/Home/HomePage.jsx';
import PhotoOfTheMonthPage from './pages/PhotoOfTheMonthPage/PhotoOfTheMonthPage.jsx';
import AboutPage from './pages/AboutPage/AboutPage.jsx';
import PaginaEventos from './pages/Eventos/PageEventos.jsx';

// --- ADICIONE A IMPORTAÇÃO ---
import ContactPage from './pages/ContactPage/ContactPage.jsx';

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
      {
        path: 'contatos',
        element: <ContactPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
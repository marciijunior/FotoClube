// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AppLayout from './components/layout/AppLayout.jsx';
import HomePage from './pages/Home/HomePage.jsx';
import PhotoOfTheMonthPage from './pages/PhotoOfTheMonthPage/PhotoOfTheMonthPage.jsx';
import AboutPage from './pages/AboutPage/AboutPage.jsx';
import PaginaEventos from './pages/Eventos/PageEventos.jsx';
import ContactPage from './pages/ContactPage/ContactPage.jsx';

// --- IMPORTANTE: Importe a nova página ---
import PhotoDetailsPage from './pages/PhotoDetailsPage/PhotoDetailsPage.jsx';

import './styles/index.css';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: 'eventos', element: <PaginaEventos /> },
      { path: 'foto-do-mes', element: <PhotoOfTheMonthPage /> },
      { path: 'sobre', element: <AboutPage /> },
      { path: 'contatos', element: <ContactPage /> },
      
      // --- NOVA ROTA ---
      // O :id permite URLs como /detalhes-foto/1, /detalhes-foto/5, etc.
      { 
        path: 'detalhes-foto/:id', 
        element: <PhotoDetailsPage /> 
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
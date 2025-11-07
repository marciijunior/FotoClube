// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AppLayout from './components/layout/AppLayout.jsx';
import HomePage from './features/home/HomePage';
import EventsPage from './features/events/EventsPage';

// --- MUDANÇA AQUI ---
// O caminho agora aponta para dentro da pasta
import PhotoOfTheMonthPage from './pages/PhotoOfTheMonthPage/PhotoOfTheMonthPage.jsx'; 
// --- FIM DA MUDANÇA ---

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
      {
        path: 'eventos', 
        element: <EventsPage />,
      },
      {
        path: 'foto-do-mes', 
        element: <PhotoOfTheMonthPage />, // Esta linha continua funcionando
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
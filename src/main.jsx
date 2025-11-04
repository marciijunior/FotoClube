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
import PhotoOfTheMonthPage from './pages/PhotoOfTheMonthPage'; 

// --- (MODIFICAÇÃO) ---
// 1. Importa a nova página "Sobre Nós"
import AboutPage from './pages/AboutPage/AboutPage'; 
// --- (FIM DA MODIFICAÇÃO) ---

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
        path: 'login', 
        element: <LoginPage />,
      },
      {
        path: 'perfil', 
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'eventos', 
        element: <EventsPage />,
      },
      {
        path: 'foto-do-mes', 
        element: <PhotoOfTheMonthPage />,
      },
      
      // --- (MODIFICAÇÃO) ---
      // 2. Adiciona a nova rota para a página "Sobre Nós"
      {
        path: 'sobre',
        element: <AboutPage />,
      },
      // --- (FIM DA MODIFICAÇÃO) ---
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
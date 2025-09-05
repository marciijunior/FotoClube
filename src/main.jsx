import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// 1. O AuthProvider já não é importado aqui
import ProtectedRoute from './routes/ProtectedRoute';
import AppLayout from './components/layout/AppLayout.jsx'; 
import HomePage from './features/home/HomePage';
import LoginPage from './features/authentication/LoginPage';
import ProfilePage from './features/profile/ProfilePage';
import EventsPage from './features/events/EventsPage';

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
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/perfil',
        element: <ProtectedRoute element={<ProfilePage />} />,
      },
      {
        path: '/eventos',
        element: <EventsPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. O AuthProvider foi removido daqui */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
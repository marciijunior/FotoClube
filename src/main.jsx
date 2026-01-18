import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApolloProvider } from "@apollo/client/react";
import { MantineProvider } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import "dayjs/locale/pt-br";
import apolloClient from "./lib/apolloClient.jsx";

import AppLayout from "./components/layout/AppLayout.jsx";
import PaginaInicial from "./pages/Inicio/PaginaInicial.jsx";
import PaginaFotoDoMes from "./pages/FotoDoMes/PaginaFotoDoMes.jsx";
import PaginaSobre from "./pages/Sobre/PaginaSobre.jsx";
import PaginaEventos from "./pages/Eventos/PageEventos.jsx";
import PaginaContato from "./pages/Contato/PaginaContato.jsx";
import AdminLayout from "./pages/Admin/components/AdminLayout.jsx";
import ListaEventos from "./pages/Admin/ListaEventos.jsx";
import EditarEvento from "./pages/Admin/EditarEvento.jsx";
import PaginaListaPostagens from "./pages/Admin/PaginaListaPostagens.jsx";
import Entrar from "./pages/Admin/Entrar.jsx";
import AdminInicio from "./pages/Admin/AdminInicio.jsx";
import GerenciarCarrossel from "./pages/Admin/GerenciarCarrossel.jsx";
import ListaVencedores from "./pages/Admin/ListaVencedores.jsx";
import EditarVencedor from "./pages/Admin/EditarVencedor.jsx";
import ListaMembros from "./pages/Admin/ListaMembros.jsx";
import EditarMembro from "./pages/Admin/EditarMembro.jsx";
import ProtectedRoute from "./components/shared/ProtectedRoute.jsx";

import "./styles/index.css";
import "@mantine/core/styles.css";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <PaginaInicial /> },
      { path: "eventos", element: <PaginaEventos /> },
      { path: "foto-do-mes", element: <PaginaFotoDoMes /> },
      { path: "sobre", element: <PaginaSobre /> },
      { path: "contatos", element: <PaginaContato /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "login", element: <Entrar /> },
      {
        path: "",
        element: <ProtectedRoute />,
        children: [
          { path: "", element: <AdminInicio /> },
          { path: "carousel", element: <GerenciarCarrossel /> },
          {
            path: "events",
            children: [
              { path: "", element: <ListaEventos /> },
              { path: "new", element: <EditarEvento /> },
              { path: ":id/edit", element: <EditarEvento /> },
            ],
          },
          {
            path: "winners",
            children: [
              { path: "", element: <ListaVencedores /> },
              { path: "new", element: <EditarVencedor /> },
              { path: ":id/edit", element: <EditarVencedor /> },
            ],
          },
          {
            path: "members",
            children: [
              { path: "", element: <ListaMembros /> },
              { path: "new", element: <EditarMembro /> },
              { path: ":id/edit", element: <EditarMembro /> },
            ],
          },
          {
            path: "posts/*",
            element: <PaginaListaPostagens />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider>
      <DatesProvider
        settings={{
          locale: "pt-br",
          firstDayOfWeek: 0,
          weekendDays: [0, 6],
          labelFormat: {
            weekday: "ddd",
          },
        }}
      >
        <ApolloProvider client={apolloClient}>
          <RouterProvider router={router} />
        </ApolloProvider>
      </DatesProvider>
    </MantineProvider>
  </React.StrictMode>
);

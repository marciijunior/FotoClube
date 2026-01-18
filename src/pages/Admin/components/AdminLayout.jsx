import React from "react";
import { AppShell, Text, Group, Button, NavLink, Stack } from "@mantine/core";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <AppShell
      padding={0}
      navbar={{
        width: 280,
        breakpoint: "sm",
      }}
      header={{ height: 70 }}
      styles={{
        main: {
          background: "#f8f9fa",
          minHeight: "100vh",
        },
      }}
    >
      <AppShell.Header>
        <Group
          h="100%"
          px="xl"
          position="apart"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Group>
            <Text
              size="xl"
              fw={800}
              c="white"
              style={{ letterSpacing: "-0.5px" }}
            >
              🎨 FotoClube
            </Text>
            <Text size="sm" c="rgba(255,255,255,0.8)">
              Admin
            </Text>
          </Group>
          <Group gap="md">
            <Button
              onClick={() => navigate("/")}
              variant="light"
              color="white"
              size="sm"
              style={{ fontWeight: 600 }}
            >
              Ver Site →
            </Button>
            <Button
              onClick={handleLogout}
              variant="subtle"
              color="white"
              size="sm"
            >
              Sair
            </Button>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar
        p="md"
        style={{ background: "white", borderRight: "1px solid #e9ecef" }}
      >
        <Stack gap="xs">
          <Text size="xs" tt="uppercase" fw={700} c="dimmed" mb="sm" px="sm">
            Navegação
          </Text>

          <NavLink
            component={Link}
            to="/admin"
            label="Dashboard"
            leftSection={<span style={{ fontSize: "1.2rem" }}>🏠</span>}
            active={isActive("/admin")}
            variant="filled"
            style={{
              borderRadius: "8px",
              fontWeight: 600,
            }}
          />

          <NavLink
            component={Link}
            to="/admin/carousel"
            label="Carrossel"
            leftSection={<span style={{ fontSize: "1.2rem" }}>🎠</span>}
            active={isActive("/admin/carousel")}
            variant="filled"
            style={{
              borderRadius: "8px",
              fontWeight: 600,
            }}
          />

          <NavLink
            component={Link}
            to="/admin/events"
            label="Eventos"
            leftSection={<span style={{ fontSize: "1.2rem" }}>📅</span>}
            active={location.pathname.startsWith("/admin/events")}
            variant="filled"
            style={{
              borderRadius: "8px",
              fontWeight: 600,
            }}
          />

          <NavLink
            component={Link}
            to="/admin/winners"
            label="Foto do Mês"
            leftSection={<span style={{ fontSize: "1.2rem" }}>🏆</span>}
            active={location.pathname.startsWith("/admin/winners")}
            variant="filled"
            style={{
              borderRadius: "8px",
              fontWeight: 600,
            }}
          />

          <NavLink
            component={Link}
            to="/admin/members"
            label="Membros"
            leftSection={<span style={{ fontSize: "1.2rem" }}>👥</span>}
            active={location.pathname.startsWith("/admin/members")}
            variant="filled"
            style={{
              borderRadius: "8px",
              fontWeight: 600,
            }}
          />
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>
        <div style={{ padding: "2rem" }}>
          <Outlet />
        </div>
      </AppShell.Main>
    </AppShell>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import {
  Paper,
  Title,
  Text,
  SimpleGrid,
  Card,
  Badge,
  Group,
  Stack,
} from "@mantine/core";
import "./AdminHome.css";

export default function AdminHome() {
  const cards = [
    {
      title: "Carrossel da Home",
      description:
        "Gerencie as imagens que aparecem no carrossel principal da página inicial",
      link: "/admin/carousel",
      color: "blue",
      icon: "🎠",
      stats: "Slides visuais",
    },
    {
      title: "Eventos",
      description:
        "Adicione, edite ou remova eventos futuros do clube de fotografia",
      link: "/admin/events",
      color: "green",
      icon: "📅",
      stats: "Calendário do clube",
    },
    {
      title: "Foto do Mês",
      description: "Gerencie o concurso de fotos mensais e adicione vencedores",
      link: "/admin/winners",
      color: "orange",
      icon: "🏆",
      stats: "Concurso mensal",
      disabled: false,
    },
    {
      title: "Membros",
      description: "Gerencie os membros do FotoClube e suas informações",
      link: "/admin/members",
      color: "grape",
      icon: "👥",
      stats: "Comunidade",
      disabled: false,
    },
  ];

  return (
    <div className="admin-home-container">
      <Stack gap="xl">
        <div>
          <Title order={1} mb="xs" className="admin-home-title">
            Painel Administrativo
          </Title>
          <Text size="lg" c="dimmed" className="admin-home-subtitle">
            Gerencie o conteúdo do site do FotoClube
          </Text>
        </div>

        <SimpleGrid
          cols={3}
          spacing="lg"
          breakpoints={[
            { maxWidth: "md", cols: 2 },
            { maxWidth: "sm", cols: 1 },
          ]}
        >
          {cards.map((card, index) => (
            <Card
              key={index}
              component={card.disabled ? "div" : Link}
              to={card.link}
              shadow="sm"
              padding="xl"
              radius="md"
              withBorder
              className="admin-card"
              style={{
                cursor: card.disabled ? "not-allowed" : "pointer",
                opacity: card.disabled ? 0.6 : 1,
              }}
            >
              <Group position="apart" mb="md">
                <div className="admin-card-icon">{card.icon}</div>
                <Badge color={card.color} variant="light" size="lg">
                  {card.stats}
                </Badge>
              </Group>

              <Title order={3} mb="sm" className="admin-card-title">
                {card.title}
              </Title>

              <Text size="sm" c="dimmed" className="admin-card-description">
                {card.description}
              </Text>

              {!card.disabled && (
                <Text
                  size="sm"
                  fw={600}
                  c={card.color}
                  mt="md"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  Acessar <span style={{ fontSize: "1.2rem" }}>→</span>
                </Text>
              )}
            </Card>
          ))}
        </SimpleGrid>
      </Stack>
    </div>
  );
}

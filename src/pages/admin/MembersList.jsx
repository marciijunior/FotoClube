import React from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import {
  Button,
  Group,
  Loader,
  Badge,
  Card,
  Text,
  Title,
  Stack,
  SimpleGrid,
  Avatar,
} from "@mantine/core";
import { Link } from "react-router-dom";

const ALL_MEMBERS = gql`
  query AllMembers {
    allMembers {
      id
      name
      email
      phone
      bio
      avatar
      role
      joinedAt
    }
  }
`;

export default function MembersList() {
  const { data, loading } = useQuery(ALL_MEMBERS);

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <Loader size="xl" />
      </div>
    );

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto" }}>
      <Stack gap="xl">
        <Group position="apart" align="center">
          <div>
            <Title order={1} style={{ fontSize: "2rem", fontWeight: 800 }}>
              👥 Membros do Clube
            </Title>
            <Text c="dimmed" size="md" mt="xs">
              Gerencie os membros do FotoClube
            </Text>
          </div>
          <Button
            component={Link}
            to="/admin/members/new"
            size="lg"
            leftSection={<span>➕</span>}
            style={{ fontWeight: 600 }}
          >
            Adicionar Membro
          </Button>
        </Group>

        <Group mb="sm">
          <Badge size="lg" variant="light" color="grape">
            {data?.allMembers?.length || 0}{" "}
            {data?.allMembers?.length === 1 ? "membro" : "membros"}
          </Badge>
        </Group>

        {!data?.allMembers || data.allMembers.length === 0 ? (
          <Card
            shadow="sm"
            padding="xl"
            radius="md"
            withBorder
            style={{ textAlign: "center" }}
          >
            <Text size="lg" c="dimmed" mb="md">
              👥 Nenhum membro cadastrado
            </Text>
            <Text size="sm" c="dimmed" mb="lg">
              Adicione o primeiro membro do clube
            </Text>
            <Button component={Link} to="/admin/members/new" size="md">
              ➕ Adicionar Primeiro Membro
            </Button>
          </Card>
        ) : (
          <SimpleGrid
            cols={3}
            spacing="lg"
            breakpoints={[
              { maxWidth: "lg", cols: 2 },
              { maxWidth: "sm", cols: 1 },
            ]}
          >
            {data.allMembers.map((member) => (
              <Card
                key={member.id}
                shadow="md"
                padding="lg"
                radius="md"
                withBorder
                style={{
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 24px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                <Stack gap="sm" align="center">
                  <Avatar
                    src={member.avatar}
                    alt={member.name}
                    size={100}
                    radius="xl"
                    color="grape"
                  >
                    {member.name.charAt(0).toUpperCase()}
                  </Avatar>

                  <Stack gap="xs" align="center" style={{ width: "100%" }}>
                    <Title
                      order={4}
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: 700,
                        textAlign: "center",
                      }}
                    >
                      {member.name}
                    </Title>

                    <Badge color="grape" variant="light">
                      {member.role === "admin" ? "Administrador" : "Membro"}
                    </Badge>

                    <Text size="sm" c="dimmed" style={{ textAlign: "center" }}>
                      📧 {member.email}
                    </Text>

                    {member.phone && (
                      <Text
                        size="sm"
                        c="dimmed"
                        style={{ textAlign: "center" }}
                      >
                        📱 {member.phone}
                      </Text>
                    )}

                    {member.bio && (
                      <Text
                        size="sm"
                        c="dimmed"
                        lineClamp={3}
                        style={{
                          minHeight: 60,
                          textAlign: "center",
                          marginTop: "0.5rem",
                        }}
                      >
                        {member.bio}
                      </Text>
                    )}
                  </Stack>

                  <Button
                    component={Link}
                    to={`/admin/members/${member.id}/edit`}
                    variant="light"
                    fullWidth
                    mt="sm"
                    style={{ fontWeight: 600 }}
                  >
                    ✏️ Editar
                  </Button>
                </Stack>
              </Card>
            ))}
          </SimpleGrid>
        )}
      </Stack>
    </div>
  );
}

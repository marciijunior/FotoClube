import React, { useState, useMemo } from "react";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import {
  Button,
  Group,
  Loader,
  Badge,
  Card,
  Text,
  Title,
  Stack,
  Image,
  TextInput,
  Select,
  Grid,
  Paper,
  Avatar,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import { Link } from "react-router-dom";
import {
  FaNewspaper,
  FaPlus,
  FaSearch,
  FaFilter,
  FaEdit,
  FaTrash,
  FaCalendar,
  FaUser,
} from "react-icons/fa";
import AdminPageLayout from "./LayoutPaginaAdmin";
import FormAdicionarPost from "./FormAdicionarPost";
import { Routes, Route, useLocation } from "react-router-dom";
import "./ListaPostagens.css";

const ALL_POSTS = gql`
  query AllPosts {
    allPosts {
      id
      title
      content
      image
      category
      createdAt
    }
  }
`;

const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;

export default function PostsList() {
  const location = useLocation();
  return (
    <Routes location={location}>
      <Route path="/" element={<PostsListMain />} />
      <Route
        path="/new"
        element={
          <AdminPageLayout
            title="Nova Postagem"
            subtitle="Adicione uma nova postagem ao feed de eventos"
            icon={<FaPlus />}
            gradient="linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
          >
            <FormAdicionarPost />
          </AdminPageLayout>
        }
      />
    </Routes>
  );
}

function PostsListMain() {
  const { data, loading, refetch } = useQuery(ALL_POSTS);
  const [deletePost] = useMutation(DELETE_POST);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Todos");

  const handleDelete = async (id, title) => {
    if (!confirm(`Tem certeza que deseja deletar "${title}"?`)) {
      return;
    }
    try {
      await deletePost({ variables: { id } });
      alert("Post deletado com sucesso!");
      refetch();
    } catch (error) {
      alert("Erro ao deletar post: " + error.message);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(Number(dateStr));
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      Notícia: "blue",
      Evento: "green",
      Destaque: "orange",
      Comunicado: "grape",
      Tutorial: "cyan",
    };
    return colors[category] || "gray";
  };

  // Filtrar e buscar posts
  const filteredPosts = useMemo(() => {
    if (!data?.allPosts) return [];

    let filtered = [...data.allPosts];

    // Filtrar por categoria
    if (categoryFilter !== "Todos") {
      filtered = filtered.filter((post) => post.category === categoryFilter);
    }

    // Buscar por termo
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(term) ||
          post.content.toLowerCase().includes(term) ||
          (post.author && post.author.toLowerCase().includes(term)),
      );
    }

    // Ordenar por data (mais recente primeiro)
    filtered.sort((a, b) => {
      const dateA = new Date(Number(a.createdAt));
      const dateB = new Date(Number(b.createdAt));
      return dateB - dateA;
    });

    return filtered;
  }, [data, searchTerm, categoryFilter]);

  if (loading) {
    return (
      <AdminPageLayout
        title="Posts"
        subtitle="Carregando posts..."
        icon={<FaNewspaper />}
        gradient="linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
      >
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
      </AdminPageLayout>
    );
  }

  const posts = data?.allPosts || [];

  return (
    <AdminPageLayout
      title="Posts do FotoClube"
      subtitle={`${posts.length} ${posts.length === 1 ? "post publicado" : "posts publicados"} • ${filteredPosts.length} ${filteredPosts.length === 1 ? "exibido" : "exibidos"}`}
      icon={<FaNewspaper />}
      gradient="linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
      actionButton={
        <Button
          component={Link}
          to="/admin/posts/new"
          size="lg"
          leftSection={<FaPlus />}
          className="admin-primary-button"
        >
          Nova Postagem
        </Button>
      }
    >
      <Stack gap="xl">
        {/* Filtros e Busca */}
        <Paper p="md" withBorder radius="md" shadow="xs">
          <Grid gutter="md">
            <Grid.Col span={{ base: 12, md: 8 }}>
              <TextInput
                placeholder="Buscar por título, conteúdo ou autor..."
                leftSection={<FaSearch />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="md"
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Select
                placeholder="Categoria"
                leftSection={<FaFilter />}
                data={[
                  "Todos",
                  "Notícia",
                  "Evento",
                  "Destaque",
                  "Comunicado",
                  "Tutorial",
                ]}
                value={categoryFilter}
                onChange={(value) => setCategoryFilter(value)}
                size="md"
              />
            </Grid.Col>
          </Grid>
        </Paper>

        {filteredPosts.length === 0 ? (
          <Card padding="xl" withBorder>
            <Stack align="center" gap="md">
              <Text size="lg" c="dimmed">
                {posts.length === 0
                  ? "Nenhum post cadastrado ainda"
                  : "Nenhum post encontrado com os filtros selecionados"}
              </Text>
              <Text size="sm" c="dimmed" ta="center">
                {posts.length === 0
                  ? 'Clique em "Nova Postagem" para criar o primeiro post'
                  : "Tente ajustar os filtros ou a busca"}
              </Text>
            </Stack>
          </Card>
        ) : (
          <Grid gutter="md">
            {filteredPosts.map((post) => (
              <Grid.Col key={post.id} span={{ base: 12, md: 6, lg: 4 }}>
                <Card
                  padding="lg"
                  withBorder
                  shadow="sm"
                  className="post-card"
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {post.image && (
                    <Card.Section>
                      <Image
                        src={post.image}
                        alt={post.title}
                        height={180}
                        fit="cover"
                      />
                    </Card.Section>
                  )}

                  <Stack gap="xs" style={{ flex: 1 }} mt="md">
                    <Group justify="space-between" wrap="nowrap">
                      <Badge
                        color={getCategoryColor(post.category)}
                        variant="light"
                        size="lg"
                      >
                        {post.category}
                      </Badge>
                    </Group>

                    <Title order={4} lineClamp={2} style={{ minHeight: "3em" }}>
                      {post.title}
                    </Title>

                    <Text
                      size="sm"
                      c="dimmed"
                      lineClamp={3}
                      style={{ flex: 1 }}
                    >
                      {post.content}
                    </Text>

                    <Group gap="xs" mt="xs">
                      <Avatar size="sm" color="blue" radius="xl">
                        <FaUser size={12} />
                      </Avatar>
                      <Text size="xs" c="dimmed">
                        {post.author || "FotoClube"}
                      </Text>
                    </Group>

                    <Group gap="xs">
                      <FaCalendar size={12} color="gray" />
                      <Text size="xs" c="dimmed">
                        {formatDate(post.createdAt)}
                      </Text>
                    </Group>

                    <Group gap="xs" mt="md" justify="flex-end">
                      <Tooltip label="Editar post">
                        <ActionIcon
                          component={Link}
                          to={`/admin/posts/${post.id}`}
                          variant="light"
                          size="lg"
                          color="blue"
                        >
                          <FaEdit />
                        </ActionIcon>
                      </Tooltip>
                      <Tooltip label="Deletar post">
                        <ActionIcon
                          variant="light"
                          size="lg"
                          color="red"
                          onClick={() => handleDelete(post.id, post.title)}
                        >
                          <FaTrash />
                        </ActionIcon>
                      </Tooltip>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        )}
      </Stack>
    </AdminPageLayout>
  );
}

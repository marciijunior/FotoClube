import React, { useState } from "react";
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
} from "@mantine/core";
import { Link } from "react-router-dom";
import { FaNewspaper, FaPlus } from "react-icons/fa";
import AdminPageLayout from "./AdminPageLayout";
import AddPostForm from "./AddPostForm";
import { Routes, Route, useLocation } from "react-router-dom";
import "./PostsList.css";

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
            <AddPostForm />
          </AdminPageLayout>
        }
      />
    </Routes>
  );
}

function PostsListMain() {
  const { data, loading, refetch } = useQuery(ALL_POSTS);
  const [deletePost] = useMutation(DELETE_POST);

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
    const date = new Date(dateStr);
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
      subtitle={`${posts.length} ${posts.length === 1 ? "post publicado" : "posts publicados"}`}
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
        {posts.length === 0 ? (
          <Card padding="xl" withBorder>
            <Stack align="center" gap="md">
              <Text size="lg" c="dimmed">
                Nenhum post cadastrado ainda
              </Text>
              <Text size="sm" c="dimmed" ta="center">
                Clique em "Nova Postagem" para criar o primeiro post
              </Text>
            </Stack>
          </Card>
        ) : (
          <Stack gap="md">
            {posts.map((post) => (
              <Card
                key={post.id}
                padding="lg"
                withBorder
                shadow="sm"
                className="post-card"
              >
                <Group align="flex-start" wrap="nowrap">
                  {post.image && (
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={150}
                      height={100}
                      fit="cover"
                      radius="md"
                    />
                  )}

                  <div style={{ flex: 1 }}>
                    <Group justify="space-between" mb="xs">
                      <div>
                        <Group gap="sm" mb={4}>
                          <Title order={4}>{post.title}</Title>
                          <Badge
                            color={getCategoryColor(post.category)}
                            variant="light"
                          >
                            {post.category}
                          </Badge>
                        </Group>
                        <Text size="sm" c="dimmed">
                          Por {post.author} • {formatDate(post.createdAt)}
                        </Text>
                      </div>
                    </Group>

                    <Text size="sm" lineClamp={2} mb="md">
                      {post.content}
                    </Text>

                    <Group gap="xs">
                      <Button
                        component={Link}
                        to={`/admin/posts/${post.id}`}
                        variant="light"
                        size="sm"
                      >
                        Editar
                      </Button>
                      <Button
                        variant="light"
                        size="sm"
                        color="red"
                        onClick={() => handleDelete(post.id, post.title)}
                      >
                        Deletar
                      </Button>
                    </Group>
                  </div>
                </Group>
              </Card>
            ))}
          </Stack>
        )}
      </Stack>
    </AdminPageLayout>
  );
}

import React, { useState } from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import {
  Button,
  TextInput,
  Textarea,
  Group,
  Select,
  FileInput,
  Stack,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

const CREATE_POST = gql`
  mutation CreatePost(
    $title: String!
    $content: String!
    $image: String
    $author: String
    $category: String
  ) {
    createPost(
      title: $title
      content: $content
      image: $image
      author: $author
      category: $category
    ) {
      id
      title
      content
      image
      category
      createdAt
    }
  }
`;

const categories = [
  { value: "Notícia", label: "Notícia" },
  { value: "Evento", label: "Evento" },
  { value: "Destaque", label: "Destaque" },
  { value: "Comunicado", label: "Comunicado" },
  { value: "Tutorial", label: "Tutorial" },
];

export default function AddPostForm() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    image: null, // agora é um arquivo
    category: "Notícia",
  });
  const [createPost, { loading }] = useMutation(CREATE_POST);
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = "";
      if (form.image) {
        // Envio do arquivo para backend (endpoint real: /upload, campo 'image')
        const data = new FormData();
        data.append("image", form.image);
        const res = await fetch("http://localhost:3002/upload", {
          method: "POST",
          body: data,
        });
        const result = await res.json();
        imageUrl = result.url;
      }

      await createPost({
        variables: {
          title: form.title,
          content: form.content,
          image: imageUrl || null,
          author: "FotoClube",
          category: form.category,
        },
      });
      alert("Post criado com sucesso!");
      navigate("/admin/posts");
    } catch (error) {
      alert("Erro ao criar post: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="md">
        <TextInput
          label="Título"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
          required
        />
        <Textarea
          label="Conteúdo"
          value={form.content}
          onChange={(e) => handleChange("content", e.target.value)}
          minRows={4}
          required
        />
        {/* Campo autor removido */}
        <Select
          label="Categoria"
          data={categories}
          value={form.category}
          onChange={(value) => handleChange("category", value)}
          required
        />
        <FileInput
          label="Imagem (opcional)"
          placeholder="Selecione uma imagem"
          value={form.image}
          onChange={(file) => handleChange("image", file)}
          accept="image/*"
        />
        <Group justify="flex-end">
          <Button
            type="submit"
            loading={loading}
            className="admin-primary-button"
          >
            Adicionar Postagem
          </Button>
        </Group>
      </Stack>
    </form>
  );
}

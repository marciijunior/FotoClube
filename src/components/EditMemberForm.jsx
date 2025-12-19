import React, { useState } from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import {
  TextInput,
  Textarea,
  Button,
  Card,
  Title,
  Group,
  Stack,
  Text,
  Select,
} from "@mantine/core";

const CREATE_MEMBER = gql`
  mutation CreateMember(
    $name: String!
    $email: String!
    $phone: String
    $bio: String
    $avatar: String
    $role: String
  ) {
    createMember(
      name: $name
      email: $email
      phone: $phone
      bio: $bio
      avatar: $avatar
      role: $role
    ) {
      id
      name
      email
      phone
      bio
      avatar
      role
    }
  }
`;

const UPDATE_MEMBER = gql`
  mutation UpdateMember(
    $id: ID!
    $name: String
    $email: String
    $phone: String
    $bio: String
    $avatar: String
    $role: String
  ) {
    updateMember(
      id: $id
      name: $name
      email: $email
      phone: $phone
      bio: $bio
      avatar: $avatar
      role: $role
    ) {
      id
      name
      email
      phone
      bio
      avatar
      role
    }
  }
`;

const DELETE_MEMBER = gql`
  mutation DeleteMember($id: ID!) {
    deleteMember(id: $id) {
      id
    }
  }
`;

export default function EditMemberForm({ member, onDone }) {
  const isEditing = Boolean(member?.id);

  const [formData, setFormData] = useState({
    name: member?.name || "",
    email: member?.email || "",
    phone: member?.phone || "",
    bio: member?.bio || "",
    avatar: member?.avatar || "",
    role: member?.role || "member",
  });

  const [createMember, { loading: creating }] = useMutation(CREATE_MEMBER, {
    refetchQueries: ["AllMembers"],
    onCompleted: () => onDone?.(),
  });

  const [updateMember, { loading: updating }] = useMutation(UPDATE_MEMBER, {
    refetchQueries: ["AllMembers"],
    onCompleted: () => onDone?.(),
  });

  const [deleteMember, { loading: deleting }] = useMutation(DELETE_MEMBER, {
    refetchQueries: ["AllMembers"],
    onCompleted: () => onDone?.(),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      await updateMember({
        variables: { id: member.id, ...formData },
      });
    } else {
      await createMember({
        variables: formData,
      });
    }
  };

  const handleDelete = async () => {
    if (confirm("Tem certeza que deseja deletar este membro?")) {
      await deleteMember({ variables: { id: member.id } });
    }
  };

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const loading = creating || updating || deleting;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <Stack gap="xl">
        <div>
          <Title order={1} style={{ fontSize: "2rem", fontWeight: 800 }}>
            {isEditing ? "✏️ Editar Membro" : "👥 Novo Membro"}
          </Title>
          <Text c="dimmed" size="md" mt="xs">
            {isEditing
              ? "Atualize as informações do membro"
              : "Adicione um novo membro ao FotoClube"}
          </Text>
        </div>

        <Card shadow="sm" padding="xl" radius="md" withBorder>
          <form onSubmit={handleSubmit}>
            <Stack gap="lg">
              <TextInput
                label="Nome Completo"
                placeholder="Ex: João Silva"
                value={formData.name}
                onChange={handleChange("name")}
                required
                size="md"
                styles={{ label: { fontWeight: 600, marginBottom: 8 } }}
              />

              <Group grow>
                <TextInput
                  label="E-mail"
                  placeholder="joao@exemplo.com"
                  type="email"
                  value={formData.email}
                  onChange={handleChange("email")}
                  required
                  size="md"
                  styles={{ label: { fontWeight: 600, marginBottom: 8 } }}
                />

                <TextInput
                  label="Telefone"
                  placeholder="(00) 00000-0000"
                  value={formData.phone}
                  onChange={handleChange("phone")}
                  size="md"
                  styles={{ label: { fontWeight: 600, marginBottom: 8 } }}
                />
              </Group>

              <TextInput
                label="URL do Avatar (opcional)"
                value={formData.avatar}
                onChange={handleChange("avatar")}
                placeholder="https://exemplo.com/foto.jpg"
                size="md"
                styles={{ label: { fontWeight: 600, marginBottom: 8 } }}
              />

              <Select
                label="Função"
                value={formData.role}
                onChange={(value) => setFormData({ ...formData, role: value })}
                data={[
                  { value: "member", label: "Membro" },
                  { value: "admin", label: "Administrador" },
                ]}
                size="md"
                styles={{ label: { fontWeight: 600, marginBottom: 8 } }}
              />

              <Textarea
                label="Biografia (opcional)"
                value={formData.bio}
                onChange={handleChange("bio")}
                placeholder="Conte um pouco sobre o membro..."
                rows={4}
                size="md"
                styles={{ label: { fontWeight: 600, marginBottom: 8 } }}
              />

              <Group
                position="apart"
                mt="xl"
                style={{
                  paddingTop: "1.5rem",
                  borderTop: "1px solid #e9ecef",
                }}
              >
                <Group>
                  <Button
                    type="submit"
                    loading={loading}
                    size="lg"
                    color="grape"
                    leftSection={<span>{isEditing ? "💾" : "👥"}</span>}
                    style={{ fontWeight: 600 }}
                  >
                    {isEditing ? "Salvar Alterações" : "Adicionar Membro"}
                  </Button>
                  <Button
                    variant="subtle"
                    onClick={onDone}
                    disabled={loading}
                    size="lg"
                  >
                    Cancelar
                  </Button>
                </Group>

                {isEditing && (
                  <Button
                    color="red"
                    onClick={handleDelete}
                    loading={loading}
                    variant="light"
                    size="lg"
                    leftSection={<span>🗑️</span>}
                  >
                    Deletar Membro
                  </Button>
                )}
              </Group>
            </Stack>
          </form>
        </Card>
      </Stack>
    </div>
  );
}

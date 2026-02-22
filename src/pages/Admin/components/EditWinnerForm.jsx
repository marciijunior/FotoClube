import { useState } from "react";
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
  Switch,
  FileInput,
  Image,
  Badge,
} from "@mantine/core";
import { uploadImage } from "../../../lib/imageUtils";

const CREATE_WINNER = gql`
  mutation CreateWinner(
    $title: String!
    $author: String!
    $image: String!
    $monthWon: String!
    $judgesNotes: String
    $isWinner: Boolean
    $position: Int
  ) {
    createWinner(
      title: $title
      author: $author
      image: $image
      monthWon: $monthWon
      judgesNotes: $judgesNotes
      isWinner: $isWinner
      position: $position
    ) {
      id
      title
      author
      image
      monthWon
      judgesNotes
      isWinner
      position
    }
  }
`;

const UPDATE_WINNER = gql`
  mutation UpdateWinner(
    $id: ID!
    $title: String
    $author: String
    $image: String
    $monthWon: String
    $judgesNotes: String
    $isWinner: Boolean
    $position: Int
  ) {
    updateWinner(
      id: $id
      title: $title
      author: $author
      image: $image
      monthWon: $monthWon
      judgesNotes: $judgesNotes
      isWinner: $isWinner
      position: $position
    ) {
      id
      title
      author
      image
      monthWon
      judgesNotes
      isWinner
      position
    }
  }
`;

const DELETE_WINNER = gql`
  mutation DeleteWinner($id: ID!) {
    deleteWinner(id: $id) {
      id
    }
  }
`;

export default function EditWinnerForm({ winner, onDone }) {
  const isEditing = Boolean(winner?.id);

  const [formData, setFormData] = useState({
    title: winner?.title || "",
    author: winner?.author || "",
    image: winner?.image || "",
    monthWon: winner?.monthWon || "",
    judgesNotes: winner?.judgesNotes || "",
    isWinner: winner?.isWinner !== undefined ? winner.isWinner : true,
    position: winner?.position || 1,
  });

  const [uploadedFile, setUploadedFile] = useState(null);

  const [createWinner, { loading: creating }] = useMutation(CREATE_WINNER, {
    refetchQueries: ["AllWinners"],
    onCompleted: () => onDone?.(),
  });

  const [updateWinner, { loading: updating }] = useMutation(UPDATE_WINNER, {
    refetchQueries: ["AllWinners"],
    onCompleted: () => onDone?.(),
  });

  const [deleteWinner, { loading: deleting }] = useMutation(DELETE_WINNER, {
    refetchQueries: ["AllWinners"],
    onCompleted: () => onDone?.(),
  });

  const handleImageUpload = async (file) => {
    if (!file) return;

    setUploadedFile(file);

    try {
      const data = await uploadImage(file);
      setFormData({ ...formData, image: data.filename });
    } catch (error) {
      alert("Erro ao enviar imagem: " + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await updateWinner({
          variables: { id: winner.id, ...formData },
        });
      } else {
        await createWinner({
          variables: formData,
        });
      }
    } catch (error) {
      alert("Erro ao salvar vencedor: " + error.message);
    }
  };

  const handleDelete = async () => {
    if (confirm("Tem certeza que deseja deletar este vencedor?")) {
      await deleteWinner({ variables: { id: winner.id } });
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
            {isEditing ? "✏️ Editar Vencedor" : "🏆 Novo Vencedor"}
          </Title>
          <Text c="dimmed" size="md" mt="xs">
            {isEditing
              ? "Atualize as informações do vencedor"
              : "Adicione um novo vencedor da Foto do Mês"}
          </Text>
        </div>

        <Card shadow="sm" padding="xl" radius="md" withBorder>
          <form onSubmit={handleSubmit}>
            <Stack gap="lg">
              <TextInput
                label="Título da Foto"
                placeholder="Ex: Amanhecer na Montanha"
                value={formData.title}
                onChange={handleChange("title")}
                required
                size="md"
                styles={{ label: { fontWeight: 600, marginBottom: 8 } }}
              />

              <TextInput
                label="Autor"
                placeholder="Ex: João Silva"
                value={formData.author}
                onChange={handleChange("author")}
                required
                size="md"
                styles={{ label: { fontWeight: 600, marginBottom: 8 } }}
              />

              <Stack gap="xs">
                {formData.image && (
                  <div>
                    <Text size="sm" fw={600} mb="xs">
                      Preview da Imagem:
                    </Text>
                    <Image
                      src={`${import.meta.env.VITE_UPLOADS_URL}/${formData.image}`}
                      height={200}
                      fit="contain"
                      radius="md"
                      style={{ border: "1px solid #e9ecef" }}
                    />
                  </div>
                )}

                <FileInput
                  label="Upload da Imagem *"
                  placeholder="Selecione uma imagem"
                  accept="image/*"
                  onChange={handleImageUpload}
                  size="md"
                  clearable
                  value={uploadedFile}
                  description="Formatos aceitos: JPG, PNG, WebP"
                  styles={{ label: { fontWeight: 600, marginBottom: 8 } }}
                />

                {formData.image && (
                  <Badge color="green" variant="light" size="md">
                    ✓ Imagem salva: {formData.image}
                  </Badge>
                )}
              </Stack>

              <TextInput
                label="Mês Vencedor"
                value={formData.monthWon}
                onChange={handleChange("monthWon")}
                placeholder="Ex: Dezembro 2025"
                required
                size="md"
                styles={{ label: { fontWeight: 600, marginBottom: 8 } }}
              />

              <Group grow>
                <Switch
                  label="Foto Vencedora (1º Lugar)"
                  description="Marque se esta é a foto vencedora do mês"
                  checked={formData.isWinner}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      isWinner: e.currentTarget.checked,
                      position: e.currentTarget.checked ? 1 : formData.position,
                    })
                  }
                  size="md"
                  color="orange"
                  styles={{ label: { fontWeight: 600 } }}
                />

                <Select
                  label="Posição"
                  description="1 = Vencedor, 2-9 = Finalistas"
                  value={String(formData.position)}
                  onChange={(value) =>
                    setFormData({
                      ...formData,
                      position: parseInt(value),
                      isWinner: parseInt(value) === 1,
                    })
                  }
                  data={[
                    { value: "1", label: "1º Lugar (Vencedor)" },
                    { value: "2", label: "2º Lugar (Finalista)" },
                    { value: "3", label: "3º Lugar (Finalista)" },
                    { value: "4", label: "4º Lugar (Finalista)" },
                    { value: "5", label: "5º Lugar (Finalista)" },
                    { value: "6", label: "6º Lugar (Finalista)" },
                    { value: "7", label: "7º Lugar (Finalista)" },
                    { value: "8", label: "8º Lugar (Finalista)" },
                    { value: "9", label: "9º Lugar (Finalista)" },
                  ]}
                  required
                  size="md"
                  styles={{ label: { fontWeight: 600, marginBottom: 8 } }}
                />
              </Group>

              <Textarea
                label="Notas dos Jurados (opcional)"
                value={formData.judgesNotes}
                onChange={handleChange("judgesNotes")}
                placeholder="Comentários sobre a foto..."
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
                    color="orange"
                    leftSection={<span>{isEditing ? "💾" : "🏆"}</span>}
                    style={{ fontWeight: 600 }}
                  >
                    {isEditing ? "Salvar Alterações" : "Adicionar Vencedor"}
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
                    Deletar Vencedor
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

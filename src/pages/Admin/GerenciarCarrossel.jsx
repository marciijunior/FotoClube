import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import {
  Button,
  Group,
  Loader,
  TextInput,
  Stack,
  Title,
  Badge,
  Card,
  Text,
  Image,
  FileInput,
} from "@mantine/core";
import { useState } from "react";
import { FaImages } from "react-icons/fa";
import AdminPageLayout from "./LayoutPaginaAdmin";
import { uploadImage } from "../../lib/imageUtils";

const GET_SLIDES = gql`
  query GetSlides {
    allSlides {
      id
      image
      title
      subtitle
      author
      order
    }
  }
`;

const CREATE_SLIDE = gql`
  mutation CreateSlide(
    $image: String!
    $title: String!
    $subtitle: String!
    $author: String!
    $order: Int!
  ) {
    createSlide(
      image: $image
      title: $title
      subtitle: $subtitle
      author: $author
      order: $order
    ) {
      id
      image
      title
      subtitle
      author
      order
    }
  }
`;

const DELETE_SLIDE = gql`
  mutation DeleteSlide($id: ID!) {
    deleteSlide(id: $id) {
      id
    }
  }
`;

export default function CarouselManage() {
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    subtitle: "",
    author: "",
    order: 1,
  });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const { data, loading, refetch } = useQuery(GET_SLIDES);
  const [createSlide, { loading: creating, error: createError }] = useMutation(
    CREATE_SLIDE,
    {
      refetchQueries: ["GetSlides"],
      onCompleted: () => {
        setFormData({
          image: "",
          title: "",
          subtitle: "",
          author: "",
          order: 1,
        });
        setImageFile(null);
        alert("Slide adicionado com sucesso!");
      },
      onError: (error) => {
        alert(`Erro ao criar slide: ${error.message}`);
      },
    },
  );
  const [deleteSlide] = useMutation(DELETE_SLIDE, {
    refetchQueries: ["GetSlides"],
  });

  const handleImageUpload = async (file) => {
    if (!file) return;

    setImageFile(file);
    setUploading(true);

    try {
      const result = await uploadImage(file);

      if (result.url) {
        setFormData({ ...formData, image: result.url });
      }
    } catch (error) {
      alert("Erro ao fazer upload da imagem");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      alert("Por favor, adicione uma imagem antes de enviar!");
      return;
    }

    try {
      await createSlide({
        variables: {
          ...formData,
          order: parseInt(formData.order),
        },
      });
    } catch (err) {
      // Erro tratado pelo onError
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Tem certeza que deseja deletar este slide?")) {
      await deleteSlide({ variables: { id } });
    }
  };

  if (loading)
    return (
      <AdminPageLayout
        title="Carrossel"
        subtitle="Carregando slides..."
        icon={<FaImages />}
        gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
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

  return (
    <AdminPageLayout
      title="Gerenciar Carrossel"
      subtitle={`${data?.allSlides?.length || 0} ${
        data?.allSlides?.length === 1
          ? "slide cadastrado"
          : "slides cadastrados"
      }`}
      icon={<FaImages />}
      gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    >
      <Stack gap="xl">
        <Card shadow="sm" padding="xl" radius="md" withBorder>
          <Title
            order={3}
            mb="lg"
            style={{ fontSize: "1.3rem", fontWeight: 700 }}
          >
            ➕ Adicionar Novo Slide
          </Title>
          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              <FileInput
                label="Upload de Imagem"
                placeholder="Clique para selecionar uma imagem"
                accept="image/*"
                value={imageFile}
                onChange={handleImageUpload}
                clearable
                size="md"
                styles={{ label: { fontWeight: 600, marginBottom: 8 } }}
                description="Formatos aceitos: JPG, PNG, GIF, WebP (máx. 5MB)"
                leftSection={<span>📷</span>}
                disabled={uploading}
              />

              {uploading && (
                <Text size="sm" c="blue">
                  ⏳ Fazendo upload da imagem...
                </Text>
              )}

              {formData.image && (
                <div>
                  <Text size="sm" fw={600} mb="xs">
                    Preview da Imagem:
                  </Text>
                  <Image
                    src={formData.image}
                    alt="Preview"
                    width={300}
                    height={200}
                    fit="cover"
                    radius="md"
                  />
                </div>
              )}

              <TextInput
                label="URL da Imagem (opcional)"
                placeholder="https://exemplo.com/imagem.jpg"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                size="md"
                styles={{ label: { fontWeight: 600, marginBottom: 8 } }}
                description="Ou cole uma URL de imagem diretamente"
              />
              <Group grow>
                <TextInput
                  label="Localização"
                  placeholder="Ex: Praia de Copacabana, Rio de Janeiro"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  size="md"
                  styles={{ label: { fontWeight: 600, marginBottom: 8 } }}
                  description="Onde a foto foi tirada"
                />
                <TextInput
                  label="Título da Foto"
                  placeholder="Ex: Pôr do Sol Dourado"
                  value={formData.subtitle}
                  onChange={(e) =>
                    setFormData({ ...formData, subtitle: e.target.value })
                  }
                  required
                  size="md"
                  styles={{ label: { fontWeight: 600, marginBottom: 8 } }}
                  description="Nome ou título da fotografia"
                />
              </Group>
              <TextInput
                label="Autor da Foto"
                placeholder="Ex: Marcio Junior"
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
                required
                size="md"
                styles={{ label: { fontWeight: 600, marginBottom: 8 } }}
                description="Nome do fotógrafo"
              />
              <TextInput
                label="Ordem de Exibição"
                type="number"
                placeholder="1"
                value={formData.order}
                onChange={(e) =>
                  setFormData({ ...formData, order: e.target.value })
                }
                required
                size="md"
                style={{ maxWidth: 200 }}
                styles={{ label: { fontWeight: 600, marginBottom: 8 } }}
              />
              <Button
                type="submit"
                loading={creating}
                size="md"
                style={{ width: "fit-content", fontWeight: 600 }}
                leftSection={<span>➕</span>}
              >
                Adicionar Slide
              </Button>
            </Stack>
          </form>
        </Card>

        <div>
          <Group position="apart" mb="md">
            <Title order={3} style={{ fontSize: "1.3rem", fontWeight: 700 }}>
              📋 Slides Cadastrados
            </Title>
            <Badge size="lg" variant="light">
              {data?.allSlides?.length || 0}{" "}
              {data?.allSlides?.length === 1 ? "slide" : "slides"}
            </Badge>
          </Group>

          {!data?.allSlides || data.allSlides.length === 0 ? (
            <Card
              shadow="sm"
              padding="xl"
              radius="md"
              withBorder
              style={{ textAlign: "center" }}
            >
              <Text size="lg" c="dimmed" mb="md">
                📭 Nenhum slide cadastrado
              </Text>
              <Text size="sm" c="dimmed">
                Adicione seu primeiro slide usando o formulário acima
              </Text>
            </Card>
          ) : (
            <Stack gap="md">
              {data.allSlides.map((slide) => (
                <Card
                  key={slide.id}
                  shadow="sm"
                  padding="lg"
                  radius="md"
                  withBorder
                >
                  <Group position="apart" align="flex-start">
                    <Group align="flex-start" style={{ flex: 1 }}>
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        width={120}
                        height={80}
                        fit="cover"
                        radius="md"
                      />
                      <Stack gap="xs" style={{ flex: 1 }}>
                        <Group gap="sm">
                          <Badge color="blue" variant="light">
                            Ordem {slide.order}
                          </Badge>
                          <Title order={4} style={{ fontWeight: 700 }}>
                            {slide.title}
                          </Title>
                        </Group>
                        <Text size="sm" c="dimmed">
                          {slide.subtitle}
                        </Text>
                        <Text
                          size="xs"
                          c="dimmed"
                          style={{
                            maxWidth: 500,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          🔗 {slide.image}
                        </Text>
                      </Stack>
                    </Group>
                    <Button
                      color="red"
                      variant="light"
                      onClick={() => handleDelete(slide.id)}
                      leftSection={<span>🗑️</span>}
                    >
                      Deletar
                    </Button>
                  </Group>
                </Card>
              ))}
            </Stack>
          )}
        </div>
      </Stack>
    </AdminPageLayout>
  );
}

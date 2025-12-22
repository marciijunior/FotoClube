import React, { useState } from "react";
import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import {
  TextInput,
  Textarea,
  Button,
  Card,
  Title,
  Group,
  Stack,
  Text,
  SimpleGrid,
  Image,
  Badge,
  Select,
  Radio,
  Loader,
  NumberInput,
  FileInput,
  Modal,
  ActionIcon,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

const ALL_WINNERS = gql`
  query AllWinners {
    allWinners {
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

export default function ManageMonthWinners({ monthWon }) {
  const navigate = useNavigate();
  const [monthName, setMonthName] = useState(monthWon || "");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [numPhotos, setNumPhotos] = useState(9);
  const [photos, setPhotos] = useState(
    Array(9)
      .fill(null)
      .map((_, i) => ({
        id: null,
        title: "",
        author: "",
        image: "",
        judgesNotes: "",
        position: i + 1,
        file: null,
      }))
  );
  const [selectedWinner, setSelectedWinner] = useState(0);
  const [modalOpened, setModalOpened] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  // Atualizar monthName quando mudar mês ou ano
  React.useEffect(() => {
    if (selectedMonth && selectedYear) {
      setMonthName(`${selectedMonth} ${selectedYear}`);
    }
  }, [selectedMonth, selectedYear]);

  // Extrair mês e ano do monthWon inicial
  React.useEffect(() => {
    if (monthWon) {
      const parts = monthWon.split(" ");
      if (parts.length === 2) {
        setSelectedMonth(parts[0]);
        setSelectedYear(parts[1]);
      }
      setMonthName(monthWon);
    }
  }, [monthWon]);

  const openPhotoModal = (index) => {
    setEditingIndex(index);
    setModalOpened(true);
  };

  const closeModal = () => {
    setModalOpened(false);
    setEditingIndex(null);
  };

  // Atualizar array de fotos quando mudar o número
  React.useEffect(() => {
    setPhotos((prev) => {
      const newPhotos = Array(numPhotos)
        .fill(null)
        .map((_, i) => {
          if (prev[i]) {
            return prev[i];
          }
          return {
            id: null,
            title: "",
            author: "",
            image: "",
            judgesNotes: "",
            position: i + 1,
          };
        });
      // Se o vencedor selecionado está fora do novo range, resetar
      if (selectedWinner >= numPhotos) {
        setSelectedWinner(0);
      }
      return newPhotos;
    });
  }, [numPhotos]);

  const { data, loading: queryLoading } = useQuery(ALL_WINNERS);
  const [createWinner, { loading: creating }] = useMutation(CREATE_WINNER);
  const [updateWinner, { loading: updating }] = useMutation(UPDATE_WINNER);
  const [deleteWinner, { loading: deleting }] = useMutation(DELETE_WINNER);

  const loading = creating || updating || deleting;

  // Carregar fotos existentes do mês
  React.useEffect(() => {
    if (data?.allWinners && monthName) {
      const monthPhotos = data.allWinners
        .filter((w) => w.monthWon === monthName)
        .sort((a, b) => a.position - b.position);

      // Sempre criar array de 9 posições
      setPhotos((prevPhotos) => {
        const loadedPhotos = Array(9)
          .fill(null)
          .map((_, i) => {
            // Se já existe uma foto localmente (com file ou image), manter
            if (prevPhotos[i] && (prevPhotos[i].file || prevPhotos[i].image)) {
              return prevPhotos[i];
            }
            
            const existing = monthPhotos.find((p) => p.position === i + 1);
            if (existing) {
              if (existing.isWinner) setSelectedWinner(i);
              return {
                id: existing.id,
                title: existing.title,
                author: existing.author,
                image: existing.image,
                judgesNotes: existing.judgesNotes,
                position: i + 1,
                file: null,
              };
            }
            return {
              id: null,
              title: "",
              author: "",
              image: "",
              judgesNotes: "",
              position: i + 1,
              file: null,
            };
          });
        return loadedPhotos;
      });
    }
  }, [data, monthName]);

  const handlePhotoChange = (index, field, value) => {
    const newPhotos = [...photos];
    newPhotos[index] = { ...newPhotos[index], [field]: value };
    setPhotos(newPhotos);
  };

  const handleImageUpload = async (index, file) => {
    if (!file) {
      console.log("Nenhum arquivo selecionado");
      return;
    }

    console.log("Iniciando upload do arquivo:", file.name);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:3002/upload", {
        method: "POST",
        body: formData,
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erro no servidor:", errorText);
        throw new Error("Erro ao fazer upload");
      }

      const data = await response.json();
      console.log("Upload bem-sucedido:", data);

      // Atualizar o estado de uma vez
      const newPhotos = [...photos];
      newPhotos[index] = {
        ...newPhotos[index],
        image: data.filename,
        file: file,
      };
      setPhotos(newPhotos);

      console.log(
        "Estado atualizado - index:",
        index,
        "filename:",
        data.filename
      );
      console.log("Novo array de photos:", newPhotos[index]);
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
      alert("Erro ao enviar imagem: " + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!monthName) {
      alert("Por favor, defina o mês do concurso");
      return;
    }

    // Validar que pelo menos uma foto foi preenchida
    const filledPhotos = photos.filter((p) => p.title && p.author && p.image);
    if (filledPhotos.length === 0) {
      alert("Adicione pelo menos uma foto com título, autor e imagem");
      return;
    }

    try {
      // Criar/atualizar cada foto
      for (let i = 0; i < photos.length; i++) {
        const photo = photos[i];

        // Se tem conteúdo
        if (photo.title && photo.author && photo.image) {
          const isWinner = i === selectedWinner;

          if (photo.id) {
            // Atualizar existente
            await updateWinner({
              variables: {
                id: photo.id,
                title: photo.title,
                author: photo.author,
                image: photo.image,
                monthWon: monthName,
                judgesNotes: photo.judgesNotes || "",
                isWinner,
                position: i + 1,
              },
            });
          } else {
            // Criar nova
            await createWinner({
              variables: {
                title: photo.title,
                author: photo.author,
                image: photo.image,
                monthWon: monthName,
                judgesNotes: photo.judgesNotes || "",
                isWinner,
                position: i + 1,
              },
              refetchQueries: ["AllWinners"],
            });
          }
        } else if (photo.id) {
          // Se tinha ID mas foi esvaziado, deletar
          await deleteWinner({
            variables: { id: photo.id },
            refetchQueries: ["AllWinners"],
          });
        }
      }

      alert("Fotos salvas com sucesso!");
      navigate("/admin/winners");
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar fotos: " + error.message);
    }
  };

  if (queryLoading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "3rem" }}
      >
        <Loader size="xl" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto" }}>
      <Stack gap="xl">
        <div>
          <Title order={1} style={{ fontSize: "2rem", fontWeight: 800 }}>
            🏆 Gerenciar Concurso Mensal
          </Title>
          <Text c="dimmed" size="md" mt="xs">
            Adicione as 9 fotos do concurso e marque qual é a vencedora
          </Text>
        </div>

        <Card shadow="sm" padding="xl" radius="md" withBorder>
          <form onSubmit={handleSubmit}>
            <Stack gap="xl">
              <div>
                <Text size="lg" fw={600} mb="md">
                  Mês do Concurso
                </Text>
                <Group grow>
                  <Select
                    label="Mês"
                    placeholder="Selecione o mês"
                    value={selectedMonth}
                    onChange={setSelectedMonth}
                    data={[
                      { value: "Janeiro", label: "Janeiro" },
                      { value: "Fevereiro", label: "Fevereiro" },
                      { value: "Março", label: "Março" },
                      { value: "Abril", label: "Abril" },
                      { value: "Maio", label: "Maio" },
                      { value: "Junho", label: "Junho" },
                      { value: "Julho", label: "Julho" },
                      { value: "Agosto", label: "Agosto" },
                      { value: "Setembro", label: "Setembro" },
                      { value: "Outubro", label: "Outubro" },
                      { value: "Novembro", label: "Novembro" },
                      { value: "Dezembro", label: "Dezembro" },
                    ]}
                    required
                    size="md"
                  />
                  <Select
                    label="Ano"
                    placeholder="Selecione o ano"
                    value={selectedYear}
                    onChange={setSelectedYear}
                    data={[
                      { value: "2023", label: "2023" },
                      { value: "2024", label: "2024" },
                      { value: "2025", label: "2025" },
                      { value: "2026", label: "2026" },
                      { value: "2027", label: "2027" },
                    ]}
                    required
                    size="md"
                  />
                </Group>
                {monthName && (
                  <Text size="sm" c="dimmed" mt="xs">
                    Concurso: <strong>{monthName}</strong>
                  </Text>
                )}
              </div>

              <div>
                <Text size="lg" fw={600} mb="xs">
                  Grid de Fotos do Concurso
                </Text>
                <Text size="sm" c="dimmed" mb="lg">
                  Clique em cada espaço para adicionar/editar a foto. A primeira
                  posição é a vencedora 🏆
                </Text>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "16px",
                    maxWidth: "900px",
                    margin: "0 auto",
                  }}
                >
                  {photos.map((photo, index) => {
                    const isWinner = index === 0;

                    return (
                      <Card
                        key={index}
                        padding="0"
                        withBorder
                        shadow={isWinner ? "lg" : "sm"}
                        radius="md"
                        style={{
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          border: isWinner
                            ? "4px solid #fab005"
                            : "2px solid #e9ecef",
                          position: "relative",
                          overflow: "hidden",
                          aspectRatio: "1/1",
                          backgroundColor: "#fff",
                        }}
                        onClick={() => openPhotoModal(index)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.03)";
                          e.currentTarget.style.boxShadow = isWinner
                            ? "0 12px 24px rgba(250, 176, 5, 0.3)"
                            : "0 8px 16px rgba(0,0,0,0.15)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                          e.currentTarget.style.boxShadow = "";
                        }}
                      >
                        {isWinner && (
                          <div
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              right: 0,
                              background:
                                "linear-gradient(135deg, #fab005 0%, #fd7e14 100%)",
                              color: "white",
                              padding: "8px",
                              textAlign: "center",
                              fontWeight: 700,
                              fontSize: "14px",
                              zIndex: 2,
                              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                            }}
                          >
                            🏆 FOTO VENCEDORA
                          </div>
                        )}

                        {photo.image ? (
                          <div
                            style={{
                              height: "100%",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <div
                              style={{
                                flex: 1,
                                position: "relative",
                                overflow: "hidden",
                                marginTop: isWinner ? "42px" : "0",
                              }}
                            >
                              <Image
                                src={`http://localhost:3002/uploads/${photo.image}`}
                                height="100%"
                                fit="cover"
                                radius="0"
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  width: "100%",
                                  height: "100%",
                                }}
                              />
                            </div>
                            <div
                              style={{
                                padding: "12px",
                                backgroundColor: isWinner
                                  ? "#fff8e1"
                                  : "#f8f9fa",
                                borderTop: isWinner
                                  ? "2px solid #fab005"
                                  : "1px solid #e9ecef",
                                minHeight: "60px",
                              }}
                            >
                              <Text size="sm" fw={600} lineClamp={1} mb={4}>
                                {photo.title || "Sem título"}
                              </Text>
                              <Text size="xs" c="dimmed" lineClamp={1}>
                                {photo.author || "Sem autor"}
                              </Text>
                            </div>
                          </div>
                        ) : (
                          <Stack
                            align="center"
                            justify="center"
                            style={{
                              height: "100%",
                              padding: "20px",
                              paddingTop: isWinner ? "62px" : "20px",
                            }}
                          >
                            <div
                              style={{
                                width: 80,
                                height: 80,
                                borderRadius: "50%",
                                backgroundColor: isWinner
                                  ? "#fff8e1"
                                  : "#f1f3f5",
                                border: isWinner
                                  ? "3px solid #fab005"
                                  : "2px solid #e9ecef",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginBottom: 12,
                              }}
                            >
                              <Text size="2.5rem">
                                {isWinner ? "👑" : "📷"}
                              </Text>
                            </div>
                            <Text
                              size="sm"
                              fw={600}
                              ta="center"
                              c={isWinner ? "orange" : "dimmed"}
                            >
                              {isWinner
                                ? "Adicionar Vencedora"
                                : "Adicionar Finalista"}
                            </Text>
                          </Stack>
                        )}
                      </Card>
                    );
                  })}
                </div>
              </div>

              <Modal
                opened={modalOpened}
                onClose={closeModal}
                title={
                  <Group>
                    <Text size="lg" fw={700}>
                      {editingIndex === 0
                        ? "🏆 Foto Vencedora"
                        : `Finalista ${editingIndex + 1}º Lugar`}
                    </Text>
                    {editingIndex === 0 && (
                      <Badge color="yellow" variant="filled">
                        1º LUGAR
                      </Badge>
                    )}
                  </Group>
                }
                size="lg"
                centered
              >
                {editingIndex !== null && (
                  <Stack gap="md">
                    {photos[editingIndex]?.image && (
                      <Card
                        padding="md"
                        withBorder
                        style={{ backgroundColor: "#f8f9fa" }}
                      >
                        <Text size="sm" fw={600} mb="xs">
                          Preview da Foto:
                        </Text>
                        <Image
                          src={`http://localhost:3002/uploads/${photos[editingIndex].image}`}
                          height={300}
                          fit="contain"
                          radius="md"
                        />
                      </Card>
                    )}

                    <FileInput
                      label="Upload da Imagem *"
                      placeholder="Selecione uma imagem"
                      accept="image/*"
                      onChange={(file) => handleImageUpload(editingIndex, file)}
                      size="md"
                      clearable
                      description="Formatos aceitos: JPG, PNG, WebP"
                    />

                    {photos[editingIndex]?.image && (
                      <Badge color="green" variant="light" size="md" fullWidth>
                        ✓ Imagem salva: {photos[editingIndex].image}
                      </Badge>
                    )}

                    <TextInput
                      label="Título da Foto"
                      placeholder="Digite o título"
                      value={photos[editingIndex]?.title || ""}
                      onChange={(e) =>
                        handlePhotoChange(editingIndex, "title", e.target.value)
                      }
                      size="md"
                    />

                    <TextInput
                      label="Autor"
                      placeholder="Nome do fotógrafo"
                      value={photos[editingIndex]?.author || ""}
                      onChange={(e) =>
                        handlePhotoChange(
                          editingIndex,
                          "author",
                          e.target.value
                        )
                      }
                      size="md"
                    />

                    <Textarea
                      label="Notas dos Jurados (opcional)"
                      placeholder="Comentários sobre a foto"
                      value={photos[editingIndex]?.judgesNotes || ""}
                      onChange={(e) =>
                        handlePhotoChange(
                          editingIndex,
                          "judgesNotes",
                          e.target.value
                        )
                      }
                      rows={4}
                      size="md"
                    />

                    <Group position="right" mt="md">
                      <Button variant="subtle" onClick={closeModal} size="md">
                        Fechar
                      </Button>
                      <Button onClick={closeModal} color="orange" size="md">
                        Salvar e Fechar
                      </Button>
                    </Group>
                  </Stack>
                )}
              </Modal>

              <Group
                position="apart"
                mt="xl"
                style={{ paddingTop: "1.5rem", borderTop: "1px solid #e9ecef" }}
              >
                <Group>
                  <Button
                    type="submit"
                    loading={loading}
                    size="lg"
                    color="orange"
                    leftSection={<span>💾</span>}
                    style={{ fontWeight: 600 }}
                  >
                    Salvar Concurso
                  </Button>
                  <Button
                    variant="subtle"
                    onClick={() => navigate("/admin/winners")}
                    disabled={loading}
                    size="lg"
                  >
                    Cancelar
                  </Button>
                </Group>
              </Group>
            </Stack>
          </form>
        </Card>
      </Stack>
    </div>
  );
}

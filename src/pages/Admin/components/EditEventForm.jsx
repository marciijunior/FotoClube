import React, { useState } from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import {
  TextInput,
  Textarea,
  Button,
  Paper,
  Title,
  Group,
  Stack,
  Card,
  Text,
  Select,
  FileInput,
} from "@mantine/core";
import { DateInput, TimeInput } from "@mantine/dates";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import "./EditEventForm.css";

const CREATE_EVENT = gql`
  mutation CreateEvent(
    $title: String!
    $date: String!
    $time: String!
    $description: String!
    $location: String!
    $image: String
    $category: String
  ) {
    createEvent(
      title: $title
      date: $date
      time: $time
      description: $description
      location: $location
      image: $image
      category: $category
    ) {
      id
      title
      date
      time
      description
      location
      image
      category
    }
  }
`;

const UPDATE_EVENT = gql`
  mutation UpdateEvent(
    $id: ID!
    $title: String
    $date: String
    $time: String
    $description: String
    $location: String
    $image: String
    $category: String
  ) {
    updateEvent(
      id: $id
      title: $title
      date: $date
      time: $time
      description: $description
      location: $location
      image: $image
      category: $category
    ) {
      id
      title
      date
      time
      description
      location
      image
      category
    }
  }
`;

const DELETE_EVENT = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id) {
      id
    }
  }
`;

export default function EditEventForm({ event, onDone }) {
  const isEditing = Boolean(event?.id);

  // Converter string de data para objeto Date se existir
  const parseDate = (dateStr) => {
    if (!dateStr) return null;
    try {
      // Formato esperado: "20, Dez-2025"
      const [dayStr, rest] = dateStr.split(", ");
      const [monthStr, yearStr] = rest.split("-");
      const monthMap = {
        Jan: 0,
        Fev: 1,
        Mar: 2,
        Abr: 3,
        Mai: 4,
        Jun: 5,
        Jul: 6,
        Ago: 7,
        Set: 8,
        Out: 9,
        Nov: 10,
        Dez: 11,
      };
      const day = parseInt(dayStr);
      const year = parseInt(yearStr);
      const month = monthMap[monthStr];

      // Criar data em UTC para evitar problemas de timezone
      return new Date(Date.UTC(year, month, day));
    } catch {
      return null;
    }
  };

  // Parsear horário existente se vier no formato "HH:MM às HH:MM"
  const parseTime = (timeStr) => {
    if (!timeStr) return { start: "", end: "" };
    const parts = timeStr.split(" às ");
    return {
      start: parts[0] || "",
      end: parts[1] || "",
    };
  };

  const existingTime = parseTime(event?.time);

  const [formData, setFormData] = useState({
    title: event?.title || "",
    date: parseDate(event?.date) || null,
    time: event?.time || "",
    description: event?.description || "",
    location: event?.location || "",
    image: event?.image || "",
    category: event?.category || "Outros",
  });

  const [startTime, setStartTime] = useState(existingTime.start);
  const [endTime, setEndTime] = useState(existingTime.end);
  const [imageFile, setImageFile] = useState(null);

  const [createEvent, { loading: creating }] = useMutation(CREATE_EVENT, {
    refetchQueries: ["AllEvents", "GetAllEvents"],
    awaitRefetchQueries: true,
    onCompleted: () => {
      // Forçar recarregamento completo do cache
      window.location.reload();
    },
  });

  const [updateEvent, { loading: updating }] = useMutation(UPDATE_EVENT, {
    refetchQueries: ["AllEvents", "GetAllEvents"],
    awaitRefetchQueries: true,
    onCompleted: () => {
      // Forçar recarregamento completo do cache
      window.location.reload();
    },
  });

  const [deleteEvent, { loading: deleting }] = useMutation(DELETE_EVENT, {
    refetchQueries: ["AllEvents", "GetAllEvents"],
    awaitRefetchQueries: true,
    onCompleted: () => {
      // Forçar recarregamento completo do cache
      window.location.reload();
    },
  });

  const handleSubmit = async (e) => {
    console.log("🚀 handleSubmit CHAMADO!", e);
    e.preventDefault();
    console.log("✋ preventDefault executado");

    // Formatar data para string no formato brasileiro (usando UTC para evitar problemas de timezone)
    const formatDate = (date) => {
      if (!date) return "";
      const d = new Date(date);
      const months = [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
      ];
      // Usar getUTCDate, getUTCMonth e getUTCFullYear para evitar offset de timezone
      return `${d.getUTCDate()}, ${months[d.getUTCMonth()]}-${d.getUTCFullYear()}`;
    };

    // Formatar horário concatenando início e fim
    const formatTime = () => {
      if (!startTime) return "";
      if (!endTime) return startTime;
      return `${startTime} às ${endTime}`;
    };

    try {
      let imageUrl = formData.image; // Manter imagem existente se estiver editando

      // Se houver novo arquivo de imagem, fazer upload
      if (imageFile) {
        const formDataUpload = new FormData();
        formDataUpload.append("image", imageFile);

        const uploadResponse = await fetch(
          `${import.meta.env.VITE_UPLOADS_URL.replace(/\/uploads$/, "")}/upload`,
          {
            method: "POST",
            body: formDataUpload,
          }
        );

        if (!uploadResponse.ok) {
          throw new Error("Erro ao fazer upload da imagem");
        }

        const uploadData = await uploadResponse.json();
        imageUrl = uploadData.url; // URL da imagem retornada pelo backend
      }

      const dataToSubmit = {
        ...formData,
        date: formatDate(formData.date),
        time: formatTime(),
        image: imageUrl,
      };

      console.log("📝 Enviando evento:", dataToSubmit);

      if (isEditing) {
        console.log("✏️ Editando evento ID:", event.id);
        const result = await updateEvent({
          variables: { id: event.id, ...dataToSubmit },
        });
        console.log("✅ Evento atualizado:", result);
      } else {
        console.log("➕ Criando novo evento");
        const result = await createEvent({
          variables: dataToSubmit,
        });
        console.log("✅ Evento criado:", result);
      }
    } catch (error) {
      console.error("❌ Erro ao salvar evento:", error);
      alert("Erro ao salvar evento: " + error.message);
    }
  };

  const handleDelete = async () => {
    if (confirm("Tem certeza que deseja deletar este evento?")) {
      await deleteEvent({ variables: { id: event.id } });
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
            {isEditing ? "✏️ Editar Evento" : "➕ Novo Evento"}
          </Title>
          <Text c="dimmed" size="md" mt="xs">
            {isEditing
              ? "Atualize as informações do evento"
              : "Preencha os dados do novo evento"}
          </Text>
        </div>

        <Card shadow="sm" padding="xl" radius="md" withBorder>
          <form onSubmit={handleSubmit}>
            <Stack gap="lg">
              <TextInput
                label="Título do Evento"
                placeholder="Ex: 13º Encontro Fotográfico"
                value={formData.title}
                onChange={handleChange("title")}
                required
                size="md"
                styles={{ label: { fontWeight: 600, marginBottom: 8 } }}
              />

              <Group grow>
                <DateInput
                  label="Data"
                  value={formData.date}
                  onChange={(value) =>
                    setFormData({ ...formData, date: value })
                  }
                  placeholder="Clique para selecionar"
                  required
                  size="md"
                  leftSection={<span style={{ fontSize: "1.2rem" }}>📅</span>}
                  valueFormat="DD/MM/YYYY"
                  locale="pt-br"
                  clearable
                  popoverProps={{
                    shadow: "xl",
                    radius: "lg",
                    withinPortal: true,
                    styles: {
                      dropdown: {
                        padding: "1.5rem",
                        border: "2px solid #e9ecef",
                        background:
                          "linear-gradient(to bottom, #ffffff, #f8f9fa)",
                      },
                    },
                  }}
                  getDayProps={(date) => {
                    const weekdays = [
                      "Domingo",
                      "Segunda",
                      "Terça",
                      "Quarta",
                      "Quinta",
                      "Sexta",
                      "Sábado",
                    ];
                    const dateObj = dayjs(date);
                    const weekday = weekdays[dateObj.day()];

                    return {
                      "data-weekday": weekday,
                      style: {
                        borderRadius: "8px",
                        fontWeight: 500,
                        fontSize: "0.95rem",
                        height: "40px",
                        width: "40px",
                        margin: "2px",
                      },
                    };
                  }}
                  styles={(theme) => ({
                    label: {
                      fontWeight: 600,
                      marginBottom: 8,
                      fontSize: "0.95rem",
                    },
                    input: {
                      fontWeight: 500,
                      "&:focus": {
                        borderColor: "#228be6",
                        borderWidth: "2px",
                      },
                    },
                    calendarHeader: {
                      marginBottom: "1rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "0.5rem",
                    },
                    calendarHeaderControl: {
                      backgroundColor: "#f1f3f5",
                      border: "none",
                      borderRadius: "8px",
                      width: "32px",
                      height: "32px",
                      fontSize: "0.85rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      "&:hover": {
                        backgroundColor: "#228be6",
                        color: "white",
                      },
                      "& svg": {
                        width: "16px",
                        height: "16px",
                      },
                    },
                    calendarHeaderLevel: {
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      color: "#228be6",
                      textAlign: "center",
                      minWidth: "150px",
                      "&:hover": {
                        backgroundColor: "#f1f3f5",
                        borderRadius: "8px",
                      },
                    },
                    monthCell: {
                      padding: "0.5rem",
                      borderRadius: "8px",
                      fontWeight: 600,
                      "&:hover": {
                        backgroundColor: "#e7f5ff",
                        color: "#228be6",
                      },
                    },
                    day: {
                      borderRadius: "8px",
                      fontWeight: 500,
                      fontSize: "0.95rem",
                      height: "40px",
                      width: "40px",
                      margin: "2px",
                      transition: "all 0.2s ease",
                      cursor: "pointer",
                      "&[data-selected]": {
                        backgroundColor: "#228be6",
                        color: "white",
                        fontWeight: 700,
                        transform: "scale(1.1)",
                        boxShadow: "0 4px 12px rgba(34, 139, 230, 0.5)",
                      },
                      "&:hover:not([data-selected])": {
                        backgroundColor: "#e7f5ff",
                        color: "#228be6",
                        transform: "scale(1.08)",
                        fontWeight: 600,
                        border: "2px solid #228be6",
                        boxShadow: "0 2px 8px rgba(34, 139, 230, 0.2)",
                      },
                      "&[data-weekend]": {
                        color: "#fa5252",
                      },
                      "&[data-weekend]:hover:not([data-selected])": {
                        backgroundColor: "#fff5f5",
                        color: "#fa5252",
                        border: "2px solid #fa5252",
                      },
                      "&[data-outside]": {
                        color: "#adb5bd",
                        opacity: 0.5,
                      },
                      "&[data-outside]:hover": {
                        opacity: 0.7,
                      },
                    },
                    weekday: {
                      color: "#868e96",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      textTransform: "uppercase",
                      width: "40px",
                      textIndent: "-9999px",
                      position: "relative",
                      "&::first-letter": {
                        textIndent: "0",
                        position: "absolute",
                        left: "50%",
                        transform: "translateX(-50%)",
                      },
                    },
                  })}
                />
              </Group>

              <Group grow>
                <TimeInput
                  label="Horário de Início"
                  value={startTime}
                  onChange={(event) => setStartTime(event.target.value)}
                  required
                  size="md"
                  styles={{ label: { fontWeight: 600, marginBottom: 8 } }}
                  leftSection={<span style={{ fontSize: "1.2rem" }}>⏰</span>}
                />

                <TimeInput
                  label="Horário de Término (Opcional)"
                  value={endTime}
                  onChange={(event) => setEndTime(event.target.value)}
                  size="md"
                  styles={{ label: { fontWeight: 600, marginBottom: 8 } }}
                  leftSection={<span style={{ fontSize: "1.2rem" }}>⏱️</span>}
                />
              </Group>

              <TextInput
                label="Local"
                value={formData.location}
                onChange={handleChange("location")}
                placeholder="Ex: Shopping Praça Nova"
                required
                size="md"
                styles={{ label: { fontWeight: 600, marginBottom: 8 } }}
              />

              <Textarea
                label="Descrição"
                value={formData.description}
                onChange={handleChange("description")}
                placeholder="Descreva os detalhes do evento..."
                rows={4}
                required
                size="md"
                styles={{ label: { fontWeight: 600, marginBottom: 8 } }}
              />

              <FileInput
                label="Imagem do Evento (opcional)"
                value={imageFile}
                onChange={setImageFile}
                placeholder="Clique para selecionar uma imagem"
                accept="image/*"
                size="md"
                leftSection={<span style={{ fontSize: "1.2rem" }}>🖼️</span>}
                styles={{ label: { fontWeight: 600, marginBottom: 8 } }}
                clearable
                description={
                  formData.image && !imageFile
                    ? "Imagem atual carregada"
                    : "Selecione uma nova imagem para substituir a atual"
                }
                rightSection={
                  formData.image && !imageFile ? (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, image: "" })}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "18px",
                        color: "#868e96",
                        padding: "4px",
                        display: "flex",
                        alignItems: "center",
                      }}
                      title="Remover imagem"
                    >
                      ✕
                    </button>
                  ) : null
                }
              />

              <Select
                label="Categoria"
                value={formData.category}
                onChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
                placeholder="Selecione a categoria"
                required
                size="md"
                data={[
                  { value: "Workshop", label: "Workshop" },
                  { value: "Passeio", label: "Passeio" },
                  { value: "Exposição", label: "Exposição" },
                  { value: "Reunião", label: "Reunião" },
                  { value: "Outros", label: "Outros" },
                ]}
                styles={{ label: { fontWeight: 600, marginBottom: 8 } }}
                searchable
                clearable
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
                    leftSection={<span>{isEditing ? "💾" : "➕"}</span>}
                    style={{ fontWeight: 600 }}
                    onClick={(e) => {
                      console.log("🖱️ BOTÃO CLICADO!", { loading, isEditing });
                      console.log("📝 Dados do formulário:", formData);
                    }}
                  >
                    {isEditing ? "Salvar Alterações" : "Criar Evento"}
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
                    Deletar Evento
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

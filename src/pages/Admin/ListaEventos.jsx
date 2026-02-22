import React, { useState, useMemo } from "react";
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
  SegmentedControl,
  Select,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaPlus } from "react-icons/fa";
import AdminPageLayout from "./LayoutPaginaAdmin";
import { parseEventDate, MONTH_MAP } from "../../lib/dateUtils";

const ALL_EVENTS = gql`
  query AllEvents {
    allEvents {
      id
      title
      date
      time
      location
      description
      category
    }
  }
`;

export default function EventsList() {
  const { data, loading, refetch } = useQuery(ALL_EVENTS, {
    fetchPolicy: "network-only",
  });

  const [filterCategory, setFilterCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc"); // desc = mais recentes primeiro
  const [selectedDate, setSelectedDate] = useState(null); // Data selecionada no input
  const [filterDate, setFilterDate] = useState(null); // Data aplicada ao filtro

  // Função para obter cor da categoria
  const getCategoryColor = (category) => {
    const colors = {
      Workshop: "#8e44ad",
      Passeio: "#27ae60",
      Exposição: "#e67e22",
      Reunião: "#2980b9",
      Outros: "#95a5a6",
    };
    return colors[category] || "#95a5a6";
  };

  // Filtra e ordena eventos
  const filteredAndSortedEvents = useMemo(() => {
    if (!data?.allEvents) return [];

    let events = [...data.allEvents];

    // Filtrar por categoria
    if (filterCategory !== "all") {
      events = events.filter((ev) => ev.category === filterCategory);
    }

    // Filtrar por data específica
    if (filterDate && filterDate instanceof Date && !isNaN(filterDate)) {
      const filterDay = filterDate.getUTCDate();
      const filterMonth = filterDate.getUTCMonth();
      const filterYear = filterDate.getUTCFullYear();

      events = events.filter((ev) => {
        try {
          const [dayStr, rest] = ev.date.split(", ");
          const [monthStr, yearStr] = rest.split("-");
          const evDay = parseInt(dayStr);
          const evMonth = MONTH_MAP[monthStr];
          const evYear = parseInt(yearStr);

          return (
            evDay === filterDay &&
            evMonth === filterMonth &&
            evYear === filterYear
          );
        } catch {
          return false;
        }
      });
    }

    // Ordenar por data
    events.sort((a, b) => {
      const dateA = parseEventDate(a.date);
      const dateB = parseEventDate(b.date);

      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

    return events;
  }, [data?.allEvents, filterCategory, sortOrder, filterDate]);

  if (loading)
    return (
      <AdminPageLayout
        title="Eventos"
        subtitle="Carregando eventos..."
        icon={<FaCalendarAlt />}
        gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
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
      title="Gerenciar Eventos"
      subtitle={`${filteredAndSortedEvents.length} ${
        filteredAndSortedEvents.length === 1
          ? "evento cadastrado"
          : "eventos cadastrados"
      }`}
      icon={<FaCalendarAlt />}
      gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
      actionButton={
        <Button
          component={Link}
          to="/admin/events/new"
          size="lg"
          leftSection={<FaPlus />}
          className="admin-primary-button"
        >
          Novo Evento
        </Button>
      }
    >
      <Stack gap="xl">
        <Card shadow="sm" padding="lg" radius="md" withBorder mb="lg">
          <Stack gap="md">
            <Group align="flex-end" grow>
              <Select
                label="Filtrar por Categoria"
                value={filterCategory}
                onChange={setFilterCategory}
                size="md"
                styles={{
                  label: {
                    fontWeight: 600,
                    marginBottom: 8,
                    fontSize: "0.95rem",
                  },
                }}
                data={[
                  { value: "all", label: "Todas as Categorias" },
                  { value: "Workshop", label: "Workshop" },
                  { value: "Passeio", label: "Passeio" },
                  { value: "Exposição", label: "Exposição" },
                  { value: "Reunião", label: "Reunião" },
                  { value: "Outros", label: "Outros" },
                ]}
              />
              <DateInput
                label="Filtrar por Data Específica"
                placeholder="Clique para selecionar"
                value={selectedDate}
                onChange={setSelectedDate}
                size="md"
                leftSection={<span style={{ fontSize: "1.2rem" }}>📅</span>}
                valueFormat="DD/MM/YYYY"
                locale="pt-br"
                clearable
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
                styles={{
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
                }}
              />
              <Button
                onClick={() => {
                  if (selectedDate) {
                    // Converter string para Date
                    const dateObj =
                      typeof selectedDate === "string"
                        ? new Date(selectedDate)
                        : selectedDate;
                    setFilterDate(dateObj);
                  }
                }}
                disabled={!selectedDate}
                size="md"
                style={{ fontWeight: 600, minWidth: 100 }}
              >
                Filtrar
              </Button>
              <Button
                onClick={() => {
                  setSelectedDate(null);
                  setFilterDate(null);
                }}
                disabled={!selectedDate && !filterDate}
                variant="light"
                color="gray"
                size="md"
                style={{ fontWeight: 600, minWidth: 100 }}
              >
                Limpar
              </Button>
            </Group>
            <div>
              <Text size="sm" fw={500} mb={5}>
                Ordenar por Data
              </Text>
              <SegmentedControl
                value={sortOrder}
                onChange={setSortOrder}
                data={[
                  { label: "▼ Mais Recentes", value: "desc" },
                  { label: "▲ Mais Antigos", value: "asc" },
                ]}
                fullWidth
              />
            </div>
          </Stack>
        </Card>

        {!filteredAndSortedEvents || filteredAndSortedEvents.length === 0 ? (
          <Card
            shadow="sm"
            padding="xl"
            radius="md"
            withBorder
            style={{ textAlign: "center" }}
          >
            <Text size="lg" c="dimmed" mb="md">
              📭{" "}
              {filterCategory === "all"
                ? "Nenhum evento cadastrado"
                : "Nenhum evento nesta categoria"}
            </Text>
            <Text size="sm" c="dimmed" mb="lg">
              {filterCategory === "all"
                ? "Crie seu primeiro evento clicando no botão acima"
                : "Tente selecionar outra categoria ou crie um novo evento"}
            </Text>
            <Button component={Link} to="/admin/events/new" size="md">
              ➕ Criar Evento
            </Button>
          </Card>
        ) : (
          <SimpleGrid
            cols={2}
            spacing="lg"
            breakpoints={[{ maxWidth: "md", cols: 1 }]}
          >
            {filteredAndSortedEvents.map((ev) => {
              const categoryColor = getCategoryColor(ev.category);
              return (
                <Card
                  key={ev.id}
                  shadow="md"
                  padding="lg"
                  radius="md"
                  withBorder
                  style={{
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    borderLeft: `6px solid ${categoryColor}`,
                    backgroundColor: `${categoryColor}08`,
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
                  <Stack gap="sm">
                    <Group position="apart">
                      <Badge color="blue" variant="light" size="lg">
                        {ev.category || "Geral"}
                      </Badge>
                      <Group gap="xs">
                        <Text size="sm" c="dimmed">
                          📅 {ev.date}
                        </Text>
                      </Group>
                    </Group>

                    <Title
                      order={3}
                      style={{ fontSize: "1.4rem", fontWeight: 700 }}
                    >
                      {ev.title}
                    </Title>

                    <Group gap="md">
                      <Text size="sm" c="dimmed">
                        🕐 {ev.time}
                      </Text>
                      <Text size="sm" c="dimmed">
                        📍 {ev.location}
                      </Text>
                    </Group>

                    {ev.description && (
                      <Text
                        size="sm"
                        c="dimmed"
                        lineClamp={2}
                        style={{ minHeight: 40 }}
                      >
                        {ev.description}
                      </Text>
                    )}

                    <Button
                      component={Link}
                      to={`/admin/events/${ev.id}/edit`}
                      variant="light"
                      fullWidth
                      mt="sm"
                      style={{ fontWeight: 600 }}
                    >
                      ✏️ Editar Evento
                    </Button>
                  </Stack>
                </Card>
              );
            })}
          </SimpleGrid>
        )}
      </Stack>
    </AdminPageLayout>
  );
}

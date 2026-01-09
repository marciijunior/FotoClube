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
  SimpleGrid,
  Image,
  Select,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { FaTrophy, FaPlus } from "react-icons/fa";
import ManageMonthWinners from "../../components/ManageMonthWinners";
import { SET_CURRENT_CONTEST } from "../../graphql/mutations";
import AdminPageLayout from "./AdminPageLayout";

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
      isCurrent
      createdAt
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

export default function WinnersList() {
  const { data, loading, refetch } = useQuery(ALL_WINNERS);
  const [managingMonth, setManagingMonth] = useState(null);
  const [setCurrentContest] = useMutation(SET_CURRENT_CONTEST, {
    onCompleted: () => {
      refetch();
    },
  });
  const [deleteWinner] = useMutation(DELETE_WINNER);

  const handleDeleteMonth = async (month) => {
    if (
      !confirm(
        `Tem certeza que deseja deletar todos os vencedores de ${month}?`
      )
    ) {
      return;
    }

    try {
      const monthWinners = data.allWinners.filter((w) => w.monthWon === month);

      for (const winner of monthWinners) {
        await deleteWinner({
          variables: { id: winner.id },
        });
      }

      alert("Concurso deletado com sucesso!");
      refetch();
    } catch (error) {
      console.error("Erro ao deletar:", error);
      alert("Erro ao deletar concurso: " + error.message);
    }
  };

  if (loading)
    return (
      <AdminPageLayout
        title="Foto do Mês"
        subtitle="Carregando concursos..."
        icon={<FaTrophy />}
        gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
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

  // Se está gerenciando um mês específico, mostrar o gerenciador
  if (managingMonth !== null) {
    return <ManageMonthWinners monthWon={managingMonth} />;
  }

  // Agrupar vencedores por mês para o dropdown
  const monthsSet = new Set(data?.allWinners?.map((w) => w.monthWon) || []);
  const months = Array.from(monthsSet).sort().reverse();

  return (
    <AdminPageLayout
      title="Foto do Mês"
      subtitle="Gerencie os vencedores do concurso mensal de fotografia"
      icon={<FaTrophy />}
      gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
      actionButton={
        <Button
          onClick={() => setManagingMonth("")}
          size="lg"
          leftSection={<FaTrophy />}
          className="admin-primary-button"
        >
          Novo Concurso (9 Fotos)
        </Button>
      }
    >
      <Stack gap="xl">
        {months.length > 0 && (
          <Card withBorder padding="md">
            <Text size="sm" fw={500} mb="xs">
              Editar concurso existente:
            </Text>
            <Select
              placeholder="Selecione um mês para editar todas as 9 fotos"
              data={months.map((m) => ({ value: m, label: m }))}
              onChange={(value) => setManagingMonth(value)}
              size="md"
              clearable
            />
          </Card>
        )}

        <div>
          <Title
            order={2}
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              marginBottom: "1rem",
            }}
          >
            📅 Últimos Vencedores
          </Title>

          {!data?.allWinners || data.allWinners.length === 0 ? (
            <Card padding="xl" withBorder>
              <Stack align="center" gap="md">
                <Text size="lg" c="dimmed">
                  Nenhum vencedor cadastrado ainda
                </Text>
                <Text size="sm" c="dimmed" ta="center">
                  Clique em "Novo Concurso (9 Fotos)" para adicionar o primeiro
                  concurso
                </Text>
              </Stack>
            </Card>
          ) : (
            <Stack gap="lg">
              {months.map((month) => {
                const monthWinners = data.allWinners
                  .filter((w) => w.monthWon === month)
                  .sort((a, b) => {
                    // Ordenar por posição
                    return a.position - b.position;
                  });

                // Vencedor é sempre position === 1
                const winner = monthWinners.find((w) => w.position === 1);
                // Finalistas são positions > 1
                const finalists = monthWinners.filter((w) => w.position > 1);

                return (
                  <Card key={month} padding="lg" withBorder shadow="sm">
                    <Group position="apart" mb="md">
                      <div>
                        <Group gap="sm">
                          <Text size="lg" fw={700}>
                            {month}
                          </Text>
                          {monthWinners[0]?.isCurrent && (
                            <Badge color="green" variant="filled" size="md">
                              ✓ ATUAL
                            </Badge>
                          )}
                        </Group>
                        <Text size="sm" c="dimmed">
                          {monthWinners.length}{" "}
                          {monthWinners.length === 1 ? "foto" : "fotos"}
                        </Text>
                      </div>
                      <Group gap="xs">
                        {!monthWinners[0]?.isCurrent && (
                          <Button
                            variant="light"
                            size="sm"
                            color="green"
                            onClick={() =>
                              setCurrentContest({
                                variables: { monthWon: month },
                              })
                            }
                          >
                            Marcar como Atual
                          </Button>
                        )}
                        <Button
                          variant="light"
                          size="sm"
                          onClick={() => setManagingMonth(month)}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="light"
                          size="sm"
                          color="red"
                          onClick={() => handleDeleteMonth(month)}
                        >
                          Deletar
                        </Button>
                      </Group>
                    </Group>

                    {winner && (
                      <div
                        style={{
                          marginBottom: finalists.length > 0 ? "1.5rem" : 0,
                        }}
                      >
                        <Badge
                          color="yellow"
                          variant="filled"
                          size="lg"
                          mb="sm"
                        >
                          🏆 FOTO VENCEDORA
                        </Badge>
                        <Card
                          padding="md"
                          withBorder
                          style={{ backgroundColor: "#fff8e1" }}
                        >
                          <Group gap="md">
                            <Image
                              src={`${import.meta.env.VITE_UPLOADS_URL}/${winner.image}`}
                              width={120}
                              height={120}
                              fit="cover"
                              radius="md"
                              style={{ border: "3px solid #fab005" }}
                            />
                            <div style={{ flex: 1 }}>
                              <Text size="md" fw={700}>
                                {winner.title}
                              </Text>
                              <Text size="sm" c="dimmed" mb="xs">
                                por {winner.author}
                              </Text>
                              {winner.judgesNotes && (
                                <Text size="sm" italic c="dimmed">
                                  "{winner.judgesNotes}"
                                </Text>
                              )}
                            </div>
                          </Group>
                        </Card>
                      </div>
                    )}

                    {finalists.length > 0 && (
                      <div>
                        <Text size="sm" fw={600} mb="sm" c="dimmed">
                          Finalistas ({finalists.length})
                        </Text>
                        <SimpleGrid
                          cols={4}
                          spacing="sm"
                          breakpoints={[
                            { maxWidth: "md", cols: 3 },
                            { maxWidth: "sm", cols: 2 },
                          ]}
                        >
                          {finalists.map((finalist) => (
                            <Card key={finalist.id} padding="xs" withBorder>
                              <Image
                                src={`${import.meta.env.VITE_UPLOADS_URL}/${finalist.image}`}
                                height={100}
                                fit="cover"
                                radius="md"
                                mb="xs"
                              />
                              <Text size="xs" fw={600} lineClamp={1}>
                                {finalist.title}
                              </Text>
                              <Text size="xs" c="dimmed" lineClamp={1}>
                                {finalist.author}
                              </Text>
                            </Card>
                          ))}
                        </SimpleGrid>
                      </div>
                    )}
                  </Card>
                );
              })}
            </Stack>
          )}
        </div>
      </Stack>
    </AdminPageLayout>
  );
}

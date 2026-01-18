import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import EditWinnerForm from "./components/EditWinnerForm";
import { Loader } from "@mantine/core";

const GET_WINNER = gql`
  query Winner($id: ID!) {
    winner(id: $id) {
      id
      title
      author
      image
      monthWon
      judgesNotes
    }
  }
`;

export default function WinnerEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const isNew = location.pathname.endsWith("/new") || !id;

  if (isNew) {
    return <EditWinnerForm onDone={() => navigate("/admin/winners")} />;
  }

  const { data, loading } = useQuery(GET_WINNER, { variables: { id } });

  if (loading)
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "3rem" }}
      >
        <Loader size="xl" />
      </div>
    );

  const winner = data?.winner;
  if (!winner)
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        Vencedor não encontrado
      </div>
    );

  return (
    <EditWinnerForm winner={winner} onDone={() => navigate("/admin/winners")} />
  );
}

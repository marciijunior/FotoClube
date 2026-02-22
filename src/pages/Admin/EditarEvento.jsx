import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import EditEventForm from "./components/EditEventForm";
import { Loader } from "@mantine/core";

const GET_EVENT = gql`
  query Event($id: ID!) {
    event(id: $id) {
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

export default function EventEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const isNew = location.pathname.endsWith("/new") || !id;

  const { data, loading } = useQuery(GET_EVENT, {
    variables: { id },
    skip: isNew,
  });

  if (isNew) {
    return <EditEventForm onDone={() => navigate("/admin/events")} />;
  }

  if (loading)
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "3rem" }}
      >
        <Loader size="xl" />
      </div>
    );

  const event = data?.event;
  if (!event)
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        Evento não encontrado
      </div>
    );

  return (
    <EditEventForm event={event} onDone={() => navigate("/admin/events")} />
  );
}

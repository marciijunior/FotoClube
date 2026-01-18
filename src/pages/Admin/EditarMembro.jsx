import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import EditMemberForm from "./components/EditMemberForm";
import { Loader } from "@mantine/core";

const GET_MEMBER = gql`
  query Member($id: ID!) {
    member(id: $id) {
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

export default function MemberEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const isNew = location.pathname.endsWith("/new") || !id;

  if (isNew) {
    return <EditMemberForm onDone={() => navigate("/admin/members")} />;
  }

  const { data, loading } = useQuery(GET_MEMBER, { variables: { id } });

  if (loading)
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "3rem" }}
      >
        <Loader size="xl" />
      </div>
    );

  const member = data?.member;
  if (!member)
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        Membro não encontrado
      </div>
    );

  return (
    <EditMemberForm member={member} onDone={() => navigate("/admin/members")} />
  );
}

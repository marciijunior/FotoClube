import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { TextInput, PasswordInput, Button, Paper, Title } from "@mantine/core";
import "./Login.css";

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      user {
        id
        email
        name
        role
      }
      message
    }
  }
`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [login, { loading, error }] = useMutation(LOGIN, {
    onCompleted(data) {
      if (data.login.ok && data.login.token) {
        localStorage.setItem("token", data.login.token);
        navigate("/admin");
      }
    },
  });

  const submit = (e) => {
    e.preventDefault();
    login({ variables: { email, password } });
  };

  return (
    <Paper
      padding="md"
      shadow="sm"
      style={{ maxWidth: 420, margin: "40px auto" }}
    >
      <Title order={3} align="center">
        Admin Login
      </Title>
      <form onSubmit={submit}>
        <TextInput
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <PasswordInput
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" fullWidth mt="md" loading={loading}>
          Entrar
        </Button>
        {error && <div style={{ color: "red" }}>{error.message}</div>}
      </form>
    </Paper>
  );
}

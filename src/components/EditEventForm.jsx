import React, { useState } from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

const CREATE_EVENT = gql`
  mutation CreateEvent($input: CreateEventInput!) {
    createEvent(input: $input) {
      id
      title
    }
  }
`;

export default function EditEventForm({ onDone }) {
  const [title, setTitle] = useState("");

  const [createEvent, { loading, error }] = useMutation(CREATE_EVENT, {
    update(cache, { data: { createEvent } }) {
      cache.modify({
        fields: {
          allEvents(existing = []) {
            const newRef = { __typename: "Event", id: createEvent.id };
            return [...existing, newRef];
          },
        },
      });
    },
    onCompleted() {
      setTitle("");
      onDone?.();
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createEvent({ variables: { input: { title } } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Título
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <button type="submit" disabled={loading}>
        Salvar
      </button>
      {error && <div className="error">{error.message}</div>}
    </form>
  );
}

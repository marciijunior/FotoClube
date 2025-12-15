import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import EditEventForm from '../../components/EditEventForm';
import { Loader } from '@mantine/core';

const GET_EVENT = gql`query Event($id: ID!){ event(id:$id){ id title date time description location } }`;

export default function EventEdit(){
  const { id } = useParams();
  const navigate = useNavigate();
  if (id === 'new') return <EditEventForm onDone={() => navigate('/admin/events')} />;

  const { data, loading } = useQuery(GET_EVENT, { variables: { id } });
  if (loading) return <Loader />;
  const ev = data?.event;
  if (!ev) return <div>Not found</div>;

  return <EditEventForm initialTitle={ev.title} onDone={() => navigate('/admin/events')} />;
}

import React from 'react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { Table, Button, Group, Loader } from '@mantine/core';
import { Link } from 'react-router-dom';

const ALL_EVENTS = gql`query AllEvents{ allEvents { id title date time location } }`;

export default function EventsList(){
  const { data, loading } = useQuery(ALL_EVENTS);
  if (loading) return <Loader />;

  return (
    <div>
      <Group position="apart" mb="md">
        <h2>Events</h2>
        <Button component={Link} to="/admin/events/new">New Event</Button>
      </Group>
      <Table>
        <thead><tr><th>Title</th><th>Date</th><th>Time</th><th>Location</th><th/></tr></thead>
        <tbody>
          {data.allEvents.map(ev => (
            <tr key={ev.id}>
              <td>{ev.title}</td>
              <td>{ev.date}</td>
              <td>{ev.time}</td>
              <td>{ev.location}</td>
              <td><Button component={Link} to={`/admin/events/${ev.id}/edit`} size="xs">Edit</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

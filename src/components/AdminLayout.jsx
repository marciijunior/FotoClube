import React from 'react';
import { AppShell, Text, Group, Button } from '@mantine/core';
import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function AdminLayout() {
  const navigate = useNavigate();

  return (
    <AppShell
      padding="md"
      navbar={<div style={{ width: 240, padding: 8 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Button variant="subtle" component={Link} to="/admin/events">Events</Button>
        </div>
      </div>}
      header={<div style={{ height: 60, padding: 8 }}><Group position="apart"><Text weight={700}>Admin Panel</Text><Button onClick={()=>navigate('/')} size="xs">Go site</Button></Group></div>}>
      <div style={{ padding: 16 }}>
        <Outlet />
      </div>
    </AppShell>
  );
}

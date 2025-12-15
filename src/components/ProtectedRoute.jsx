import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { Loader } from '@mantine/core';

const ME = gql`query Me { me { id email role } }`;

export default function ProtectedRoute({ requiredRole }) {
  const { data, loading } = useQuery(ME);
  if (loading) return <Loader />;
  if (!data?.me) return <Navigate to="/admin/login" replace />;
  if (requiredRole && data.me.role !== requiredRole) return <Navigate to="/" replace />;
  return <Outlet />;
}

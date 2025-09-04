// src/hooks/useAuth.js

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // <-- Make sure this path is correct

export function useAuth() {
  return useContext(AuthContext);
}
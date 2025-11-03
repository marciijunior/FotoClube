// src/components/common/ThemeToggleButton.jsx
import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import './ThemeToggleButton.css';

function ThemeToggleButton({ theme, toggleTheme }) {
  const isDark = theme === 'dark';

  return (
    <button
      className="theme-toggle-button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
      title={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
    >
      {isDark ? (
        <FaSun /> // Mostra o sol quando está escuro
      ) : (
        <FaMoon /> // Mostra a lua quando está claro
      )}
    </button>
  );
}

export default ThemeToggleButton;
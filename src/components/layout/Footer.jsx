import React from 'react';

function Footer() {
  const footerStyle = {
    textAlign: 'center',
    padding: '20px',
    marginTop: 'auto',
    backgroundColor: '#333',
    color: 'white'
  };

  return (
    <footer style={footerStyle}>
      <p>&copy; 2025 FotoClube. Todos os direitos reservados.</p>
    </footer>
  );
}

export default Footer;
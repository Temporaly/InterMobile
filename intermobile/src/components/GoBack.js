import React from 'react';
import { useNavigate } from 'react-router-dom';  // Importa el hook useNavigate
import { CgChevronLeft } from 'react-icons/cg';  // Importa el ícono de chevron hacia la izquierda

const GoBackButton = () => {
  const navigate = useNavigate();  // Inicializa el hook useNavigate

  const handleClick = () => {
    navigate(-1);  // Navega a la página anterior
  };

  return (
    <button onClick={handleClick} className='Profile_Chevron' style={{ 
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
    }}>
      <CgChevronLeft />
    </button>
  );
};

export default GoBackButton;

/* Original Generated Button

// GoBackButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'react-icons/fa';

const GoBackButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        position: 'absolute',   // Posiciona el botón de manera absoluta
        top: '20px',           // Ajusta la distancia desde el borde superior
        left: '20px',          // Ajusta la distancia desde el borde izquierdo
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontSize: '24px',
        color: '#000',
        zIndex: 10             // Asegúrate de que el botón esté sobre la imagen
      }}
    >
      <ChevronLeft />
    </button>
  );
};

export default GoBackButton;

*/
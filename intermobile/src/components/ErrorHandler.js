import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Componente de manejo de errores
const ErrorHandler = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Vibrar el dispositivo si hay un mensaje de error
    if (navigator.vibrate && visible && message) {
      navigator.vibrate(200);
      console.log("*Vibrates*");
    }
  }, [visible, message]); // Añade 'message' como dependencia

  // Manejar el cierre del mensaje de error
  const handleClose = () => {
    setVisible(false);
    if (onClose) {
      onClose();
    }
  };

  if (!visible || !message) return null;

  return (
    <div className="DAIoverlay">
      <div className="DAIcontainer">
        <div className="DAItitle">Error</div>
        <p className="DAImessage">{message}</p>
        <div className="DAIbuttonContainer">
          <button onClick={handleClose} className="DAIbutton">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

ErrorHandler.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};

export default ErrorHandler;

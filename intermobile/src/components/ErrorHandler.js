import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Componente de manejo de errores
const ErrorHandler = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Vibrar el dispositivo si la API está disponible
    if (navigator.vibrate && visible === true) {
      navigator.vibrate(200); // Intervention by Chrome because User hasn't tapped on any frame :|
      console.log("*Vibrates*")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

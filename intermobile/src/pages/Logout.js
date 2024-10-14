import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext'; // Asegúrate de importar el AuthContext

function Logout() {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext); // Obtener la función logout del contexto

    useEffect(() => {

        // Ejecutar la función logout
        logout();

        // Redirige a la ruta "/"
        navigate('/');
    }, [navigate, logout]);

    return null; // O puedes mostrar un mensaje de "Cerrando sesión..."
}

export default Logout;

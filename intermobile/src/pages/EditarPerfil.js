import React, { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { supabase } from '../utils/supabase';
import GoBackButton from '../components/GoBack';
import { FaSave, FaTimes } from 'react-icons/fa';
import { GoPencil } from "react-icons/go";
import { AuthContext } from '../components/AuthContext'; // Importar AuthContext
import { useTheme } from '../utils/ThemeContext.js';

function DummyPerfil() {
  const { auth } = useContext(AuthContext); // Obtener el contexto de autenticación
  const [user, setUser] = useState({
    Username: '',
    Nombre: '',
    Apellido: '',
    Direccion: '',
    Telefono: '',
    Foto: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const { theme } = useTheme();

  useEffect(() => {
    async function fetchUser() {
      if (!auth.IDUsuario) return; // Asegurarse de que hay un IDUsuario

      const { data, error } = await supabase
        .from('Usuario')
        .select('*')
        .eq('IDUsuario', auth.IDUsuario) // Usar IDUsuario del contexto
        .single();

      if (error) {
        console.error('Error fetching user data:', error);
      } else {
        setUser(data);
        setFormData(data);
      }
    }

    fetchUser();
  }, [auth.IDUsuario]); // Dependencia en IDUsuario

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from('Usuario')
      .update({
        Nombre: formData.Nombre,
        Apellido: formData.Apellido,
        Direccion: formData.Direccion,
        Telefono: formData.Telefono
      })
      .eq('IDUsuario', auth.IDUsuario); // Usar IDUsuario del contexto

    if (error) {
      console.error('Error updating user data:', error);
    } else {
      setUser(formData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  return (
    <div>
      <GoBackButton />
      <div className="ProfileTop">
        <img src={user.Foto} alt="Profile" className="ProfilePfp" />
        <h1 className="Profile_UsernameText" style={{color: theme.text}}>{user.Username}</h1>
      </div>
      <div className="Profile_DataContainer">
        {isEditing ? (
          <Form onSubmit={handleSubmit} className="profile-form">
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="Nombre"
                value={formData.Nombre}
                onChange={handleChange}
                required
                className="profile-form-control"
              />
            </Form.Group>
            <Form.Group controlId="formApellido">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="Apellido"
                value={formData.Apellido}
                onChange={handleChange}
                required
                className="profile-form-control"
              />
            </Form.Group>
            <Form.Group controlId="formDireccion">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                name="Direccion"
                value={formData.Direccion}
                onChange={handleChange}
                required
                className="profile-form-control"
              />
            </Form.Group>
            <Form.Group controlId="formTelefono">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                name="Telefono"
                value={formData.Telefono}
                onChange={handleChange}
                required
                className="profile-form-control"
              />
            </Form.Group>
            <Button variant="success" type="submit" className="profile-save-button">
              <FaSave /> Guardar
            </Button>
            <Button variant="secondary" onClick={handleCancel} className="profile-cancel-button">
              <FaTimes /> Cancelar
            </Button>
          </Form>
        ) : (
          <div>
            <h3 className="Profile_PaddedTop" style={{color: theme.text}}>Nombre y Apellido</h3>
            <p style={{color: theme.text}}>{user.Nombre + " " + user.Apellido}</p>
            <h3 className="Profile_PaddedTop" style={{color: theme.text}}>Dirección</h3>
            <p style={{color: theme.text}}>{user.Direccion}</p>
            <h3 className="Profile_PaddedTop" style={{color: theme.text}}>Teléfono</h3>
            <p style={{color: theme.text}}>{user.Telefono}</p>
            {/*eslint-disable-next-line*/}
            <a onClick={() => setIsEditing(true)} className="EditInfo" href=''>
              <GoPencil size={40} /> Editar Información
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default DummyPerfil;
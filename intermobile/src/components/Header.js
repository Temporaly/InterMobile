import React, { useState, useEffect } from 'react';
import Stack from 'react-bootstrap/Stack';
import logo from '../vendor/logo.svg'
import { supabase } from '../utils/supabase';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


function Header() {
    const [userData, setUserData] = useState([]);
  
    useEffect(() => {
      async function fetchUserData() {
        const { data, error } = await supabase
          .from('Usuario')
          .select('*')
          .eq('IDUsuario', '2')
          .single();
  
        if (error) {
          console.error('Error fetching user data:', error);
        } else {
          setUserData(data);
        }
      }
  
      fetchUserData();
    }, []);
  
    return (
      <Stack direction="horizontal" gap={3}>
        <div className="p-2"><img src={logo} alt="logo" className="logo_nav" /></div>
        <div style={{ fontSize: '20' }} className="p-2 ms-auto fs-3s">{userData.Username}</div>
        <div className="p-2">
          <DropdownButton id="dropdown-basic-button" title={<img src={userData.Foto} alt="Pfp" className="pfp" />}>
            <Dropdown.Item href="#/profile">Perfil</Dropdown.Item>
            <Dropdown.Item href="#/options">Opciones</Dropdown.Item>
            <Dropdown.Item href="#/logout">Cerrar Sesión</Dropdown.Item>
          </DropdownButton>
        </div>
      </Stack>
    );
  }
  
  export default Header;
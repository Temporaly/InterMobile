import React from 'react';
import { useState, useEffect } from 'react';
import GoBackButton from '../components/GoBack';
import EditInfoButton from '../components/EditInfo';
import { supabase } from '../utils/supabase';

function Perfil()
{
    const [user, setUser] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      const { data, error } = await supabase
        .from('Usuario')
        .select('*')
        .eq('IDUsuario', '2')
        .single();

        if (error) {
            console.error('Error fetching user data:', error);
        } else {
            setUser(data);
        }
    }

    fetchUser();
  }, []);

    return(
        <div>
            <GoBackButton/>
            <div class="ProfileTop" name="top">
                <img src={user.Foto} alt="PFP Goes Here!" class="ProfilePfp" />
                <h1 class="Profile_UsernameText">{user.Username}</h1>
            </div>
            <div class="Profile_DataContainer" name="bott">
                <h3 class="Profile_PaddedTop">Nombre y Apellido</h3>
                <p>{user.Nombre + " " + user.Apellido}</p>
                <h3 class="Profile_PaddedTop">Dirección</h3>
                <p>{user.Direccion}</p>
                <h3 class="Profile_PaddedTop">Teléfono</h3>
                <p>{user.Telefono}</p>
            </div>
        <EditInfoButton/>
        </div>
    );
}

export default Perfil
import React, { useState, useEffect } from 'react';
import UserCard from './Card';
import { supabase } from '../utils/supabase';

const HomeRec = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchRandomUser() {
      const { data, error } = await supabase
        .from('Usuario')
        .select('*')
        .gte('IDUsuario', 3)
        .lte('IDUsuario', 7);

      if (error) {
        console.error('Error fetching user:', error);
      } else if (data && data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);
        setUser(data[randomIndex]);
      }
    }

    fetchRandomUser();
  }, []);

  return (
    <div>
      <h2 className='rec'>Alumno Del Día</h2>
      <div class="UsCard">
      {user && <UserCard user={user} />}
      </div>
    </div>
  );
};

export default HomeRec;
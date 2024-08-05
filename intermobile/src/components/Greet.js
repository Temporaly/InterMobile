import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

function Greet() {

    const [user, setUser] = useState([])

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
                setUser(data);
            }
        }

        fetchUserData();
    }, []);

    return(
        <div>
            <h1 class="Home_Greet">Bienvenido, {user.Username}!</h1>
        </div>
    );
};

export default Greet
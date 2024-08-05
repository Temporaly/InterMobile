import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

function ProxClases() {

    const [user, setUser] = useState([])
    const [userCla, setUserC] = useState([])

    useEffect(() => {
        async function loadUserData() {
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

        async function loadUserClases() {
            const { data, error } = await supabase
                .from('Clase')
                .select('*')
                .eq('IDUsuarioReceptor', user.IDUsuario)

            if (error) {
                console.error('Error fetching user data:', error);
            } else {
                setUserC(data);
            }
        }

        loadUserData();
        loadUserClases();
    }, );

    return(
        <div>
            <h2>Clases Próximas:</h2>
            
            {userCla.length < 1 && (
                <div>
                    <p>Ninguna</p>
                </div>
            )}

            {userCla.length > 0 && (
            <div>
                {userCla.map((Class) => (
                <p>Clase de {Class.IDMateria}, el día {Class.Fecha}</p>
                ))}
            </div>
            )}
        </div>
    );
};
// TODO: Terminarlo jsjsjsj
export default ProxClases
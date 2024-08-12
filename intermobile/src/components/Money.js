import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

function Money() {

    const [user, setUser] = useState([])
    const [userWall, setUserW] = useState([])
    const [userPur, setUserP] = useState([])

    useEffect(() => {
        async function loadUserData() {
            const { data, error } = await supabase
                .from('Usuario')
                .select('*')
                .eq('IDUsuario', '2')
                .single();

            if (error) {
                //console.error('Error fetching user data:', error);
            } else {
                setUser(data);
            }
        }

        async function loadUserWallet() {
            const { data, error } = await supabase
                .from('Billetera')
                .select('*')
                .eq('IDBilletera', user.IDBilletera)
                .single();

            if (error) {
                //console.error('Error fetching user data:', error);
            } else {
                setUserW(data);
            }
        }

        async function loadUserPurchases() {
            const { data, error } = await supabase
                .from('Compra')
                .select('*')
                .eq('IDBilletera', user.IDBilletera)

            if (error) {
                //console.error('Error fetching user data:', error);
            } else {
                setUserP(data);
            }
        }

        loadUserData();
        loadUserWallet();
        loadUserPurchases();
    }, );

    return(
        <div>
            <h2>Saldo Actual: {userWall.Saldo} Intercoins</h2>
            
            {userPur.length > 0 && (
            <div>
                <h2>Compras Recientes:</h2>
                {userPur.map((userPur) => (
                <p>Tipo: Clase Costo: {userPur.Total} Intercoins</p>
                ))}
            </div>
            )}
        </div>
    );
};

export default Money
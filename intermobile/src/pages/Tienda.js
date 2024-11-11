import React, { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { supabase } from '../utils/supabase';
import { AuthContext } from '../components/AuthContext'; // Asegúrate de que el contexto esté definido
import ErrorHandler from '../components/ErrorHandler';
import { useTheme } from '../utils/ThemeContext.js';

function Tienda() {
    const { auth } = useContext(AuthContext); // Obtener el contexto del usuario
    const [saldo, setSaldo] = useState(0);
    const [amountToBuy, setAmountToBuy] = useState(0);
    //const [cotizacion, setCotizacion] = useState(0); // Valor de intercoin en pesos
    const [error, setError] = useState('');
    const { theme } = useTheme();

    const handleError = (message) => {
        setError(message);
    };
    
    const handleCloseError = () => {
        setError('');
    };

    useEffect(() => {
        async function fetchData() {
            if (!auth || !auth.IDUsuario) return;

            // Obtener saldo del usuario
            const { data: walletData, error: walletError } = await supabase
                .from('Billetera')
                .select('Saldo')
                .eq('IDBilletera', auth.IDUsuario)
                .single();

            if (walletError) {
                console.error('Error fetching wallet data:', walletError);
                handleError('Error al obtener el saldo.');
                return;
            }

            setSaldo(walletData.Saldo);
        }

        fetchData();
    }, [auth]);

    const handleBuy = async (e) => {
        e.preventDefault();

        if (amountToBuy <= 0) {
            handleError('La cantidad a comprar debe ser mayor a 0.');
            return;
        }

        const newSaldo = saldo + amountToBuy;

        // Actualizar saldo en la billetera
        const { error: updateError } = await supabase
            .from('Billetera')
            .update({ Saldo: newSaldo })
            .eq('IDBilletera', auth.IDUsuario);

        if (updateError) {
            console.error('Error updating wallet:', updateError);
            handleError('Error al actualizar el saldo.');
        } else {
            setSaldo(newSaldo);
            setAmountToBuy(0); // Resetear input
            handleError('');
        }
    };

    return (
        <div className="saldo-container">
            <ErrorHandler message={error} onClose={handleCloseError} />
            <h1 style={{color: theme.text}}>Tu Saldo: {saldo} Intercoins</h1>
            <hr />
            <h2 style={{color: theme.text}}>Tabla de Cotización:</h2>
            <p style={{fontSize: "larger", color: theme.text}}>1 intercoin = 10 AR$</p>
            <p style={{fontSize: "larger", color: theme.text}}>10 intercoins = 100 AR$</p>
            <p style={{fontSize: "larger", color: theme.text}}>100 intercoins = 1000 AR$</p>
            <hr />
            <h3 style={{ textAlign: 'center', color: theme.text }}>Deseo comprar</h3>
            <Form onSubmit={handleBuy} style={{ textAlign: 'center' }}>
                <Form.Group controlId="amountToBuy">
                    <Form.Control
                        type="number"
                        value={amountToBuy}
                        onChange={(e) => setAmountToBuy(Number(e.target.value))}
                        placeholder="Cantidad de Intercoins"
                        required
                        style={{float: "left"}}
                    />
                    <span style={{color: theme.text}}> Intercoins</span>
                </Form.Group>
                <Button variant="primary" type="submit" style={{background: theme.mainColor, color: theme.text}}>Comprar</Button>
            </Form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default Tienda;

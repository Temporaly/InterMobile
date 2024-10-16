import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { supabase } from "../utils/supabase";
import ErrorHandler from './ErrorHandler';
import { CurrencyContext } from '../App'; // Import CurrencyContext
import { AuthContext } from '../components/AuthContext'; // Import AuthContext

function HomepageLanding() {
  const { auth } = useContext(AuthContext); // Obtener el contexto de autenticación
  const [user, setUser] = useState(null);
  const [userWall, setUserW] = useState(null);
  const [userPur, setUserP] = useState([]);
  const [error, setError] = useState('');
  const { currency } = useContext(CurrencyContext); // Obtener la moneda seleccionada

  const handleError = (message) => {
    setError(message);
  };

  const handleCloseError = () => {
    setError('');
  };

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        // Verifica si el usuario está autenticado
        if (!auth.isLoggedIn || !auth.IDUsuario) {
          throw new Error('No estás autenticado.');
        }

        // Fetch user data
        const { data: userData, error: userError } = await supabase
          .from('Usuario')
          .select('*')
          .eq('IDUsuario', auth.IDUsuario) // Usar IDUsuario del contexto
          .single();

        if (userError) throw userError;

        if (isMounted) {
          setUser(userData);

          // Fetch user wallet data
          const { data: walletData, error: walletError } = await supabase
            .from('Billetera')
            .select('*')
            .eq('IDBilletera', userData.IDBilletera)
            .single();

          if (walletError) throw walletError;

          if (isMounted) {
            setUserW(walletData);

            // Fetch user purchases
            const { data: purchasesData, error: purchasesError } = await supabase
              .from('Compra')
              .select('*')
              .eq('IDBilletera', userData.IDBilletera);

            if (purchasesError) throw purchasesError;

            if (isMounted) {
              setUserP(purchasesData);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        handleError("Error al traer los datos del Usuario\n " + error.message);
      }
    }

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [auth]); // Agregar auth a las dependencias

  if (!user || !userWall) {
    return (
      <div>
        Loading... 
        <ErrorHandler message={error} onClose={handleCloseError} />
      </div>
    );
  }

  return (
    <div className="homepage-landing">
      <div className="bienvenido-hungry-dued">
        Bienvenido, {user.Username}!
      </div>
      <div className="group-1">
        <div className="saldo-actual">
          Saldo Actual:
        </div>
        <p className="intercoins">
          <span className="intercoins-sub-0">{userWall.Saldo}</span>
          <span className='ColorInc'> {currency}</span>
        </p>
        {console.log(userPur.length)}
        {userPur.length !== 0 && (
          <div>
            <div className="compras-recientes">
            Compras Recientes:
            </div>
            {userPur.map((purchase) => (
            <p key={purchase.IDCompra} className='class_Mapped'>
            Clase - {purchase.Total} {currency}
            </p>
            ))}
          </div>
        )}
        
      </div>
      <div className='Home_ButtonAllign'>
        <Link to="/Classes">
          <Button
            variant="primary"
            style={{ padding: "4%", paddingLeft: "25%", paddingRight: "25%", background: "#FBBC05", color: "rgb(0, 0, 0)", margin: "5%", marginTop: "2.5%", marginBottom: "1.5%" }}
          >
            Ver Clases Próximas
          </Button>
        </Link>
        <Link to="/Search">
          <Button
            variant="primary"
            style={{ padding: "4%", paddingRight: "27%", paddingLeft: "27%", color: "#000000", margin: "5%", marginTop: "2.5%", marginBottom: "1.5%" }}
          >
            Buscar Profesores
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default HomepageLanding;

import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import logoLand from "../vendor/logo-land.svg";
import { AuthContext } from '../components/AuthContext';

export default function LogCentral() {

    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);

    useEffect(() => {

        if(auth.isLoggedIn)
        {
            navigate('/Home');
        }

    })

    return(
        <div className="App-FT" style={{height: "100vh"}}>
            <div id='Filler' className='fill' style={{padding: "13%"}}></div>
            <h1 className="App-FT_Welc" >Bienvenido a:</h1>
            <img src={logoLand} alt="logo" className="App-FT_logo" />
            <div id='Filler' className='fill' style={{padding: "17%"}}></div>
            <div className='Home_ButtonAllign'>
            <Link to="/Login">
                <Button
                variant="primary"
                style={{ padding: "4%", paddingLeft: "25%", paddingRight: "25%", background: "#095DB7", color: "#083E78", margin: "5%", marginTop: "2.5%", marginBottom: "2%" }}
                >
                    Iniciar Sesión
                </Button>
            </Link>
            <Link to="/Register">
                <Button
                variant="primary"
                style={{ padding: "4%", paddingLeft: "26.75%", paddingRight: "26.75%", background: "#095DB7", color: "#083E78", margin: "5%", marginTop: "2.5%", marginBottom: "2%" }}
                >
                    Registrarse
                </Button>
            </Link>
            </div>
        </div>
    )

}
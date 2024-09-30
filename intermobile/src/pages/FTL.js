import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import logoLand from "../vendor/logo-land.svg";

export default function FTT() {

    return(
        <div class="App-FT">
            <div id='Filler' className='fill' style={{padding: "13%"}}></div>
            <h1 class="App-FT_Welc" >Bienvenido a:</h1>
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
            <div id='Filler' className='fill' style={{padding: "14.5%"}}></div>
        </div>
    )

}
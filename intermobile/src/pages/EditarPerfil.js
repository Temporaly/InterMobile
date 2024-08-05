import React from "react";
import sillyguy from '../vendor/sillyguy.jpg'
import GoBackButton from "../components/GoBack";

const SillyWidth = '75%';

function EditarPerfil()
{
    return(
        <div className="ProfileTop">
            <GoBackButton/>
            <img src={sillyguy} alt="Cat" className="Silly" style={{width: SillyWidth, paddingTop: 125}} />
            <h2 className="Profile_UsernameText">Huh?</h2>
        </div>
    );
}

export default EditarPerfil
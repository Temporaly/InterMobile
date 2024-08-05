import React from "react";
import { Link } from 'react-router-dom';
import { GoPencil } from "react-icons/go";

const EditInfoButton = () => {
    return(
        <Link to="/EditarPerfil" className="EditInfo"><GoPencil size={40} /> Editar Información</Link>
    );
};

export default EditInfoButton;
import React from "react";
//Everything with the "Comp_" prefix means it's a different component.
function Home()
{
    return(
        <div>
            <div name="Comp_Greeting">
                <h1>Bienvenido! User.Nombre</h1>
            </div>
            <div name="Comp_Money">
                <h2>Saldo Actual:</h2>
                <h2>Compras Recientes:</h2>
                <p>Compra 1</p>
                <p>Compra 2</p>
                <p>Compra 3</p>
            </div>
            <div name="Comp_Chat">
                <h2>Chats Recientes:</h2>
            </div>
            <div name="Comp_Class">
                <h2>Clases Próximas:</h2>
            </div>
        </div>
    );
}

export default Home
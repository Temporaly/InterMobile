import React from "react";
import Greet from "../components/Greet";
import Money from "../components/Money";
import ProxClases from "../components/Clases";
//Everything with the "Comp_" prefix means it's a different component.
function Home()
{
    return(
        <div>
            <div name="Comp_Greeting">
                <Greet/>
            </div>
            <div name="Comp_Money">
                <Money/>
            </div>
            <div name="Comp_Chat">
                <h2>Chats Recientes:</h2>
            </div>
            <div name="Comp_Class">
                <ProxClases/>
            </div>
        </div>
    );
}

export default Home
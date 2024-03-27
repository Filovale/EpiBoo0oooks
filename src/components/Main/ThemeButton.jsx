import './ThemeButton.css'
import React, { useContext } from 'react';
import { ThemeContext } from "../../context/ThemeContextProvider";

//Viene definita una funzione ThemeButton come componente React.
//Accetta una prop changeTheme, che è la funzione per cambiare il tema dell'applicazione.
export default function ThemeButton ({ changeTheme }) {

    //Viene utilizzato il hook useContext per accedere al contesto di tema. Viene estratto il valore del tema (theme) dal contesto.
    const { theme } = useContext(ThemeContext);


    return (

        //Viene reso il pulsante che cambierà il tema dell'applicazione quando viene cliccato.
        //La classe del pulsante (className) viene impostata dinamicamente in base al tema corrente.
        //Il testo del pulsante cambia anche in base al tema corrente
        <div className='d-flex justify-content-center'>                                     {/*Quando il pulsante viene cliccato, viene chiamata la funzione changeTheme passata come prop, creata nel main AllBooks */}
            <button className={theme === "dark" ? "theme-dark-style" : "theme-light-style"} onClick={changeTheme}>{theme === "dark" ? "Light Mode" : "Dark Theme"}</button>
        </div>
    )
}
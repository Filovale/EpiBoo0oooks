import { createContext } from "react";
import { useState } from "react";


//Viene creato un contesto di tema utilizzando la funzione createContext()
//Questo contesto verrà utilizzato per passare il tema ai componenti figli
export const ThemeContext = createContext(null);

//Viene definito un componente React chiamato ThemeContextProvider che funge da provider del contesto di tema
//Prende un componente children come prop, che rappresenta i componenti figli che saranno avvolti dal provider del contesto
export default function ThemeContextProvider ( {children} ) {

    //Viene utilizzato lo hook useState per definire uno stato theme con valore iniziale "light" e una funzione setTheme per aggiornare il tema.
    const [theme, setTheme] = useState("light");

    //Viene creato un oggetto value che contiene lo stato del tema e la funzione per impostarlo.
    const value = {
        theme,
        setTheme
    };

    //Il contesto di tema viene reso disponibile a tutti i componenti figli. Il valore del contesto viene passato come prop value
    //Infine, i componenti figli possono accedere al tema utilizzando useContext
    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    )
}
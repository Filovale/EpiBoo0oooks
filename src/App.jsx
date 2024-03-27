import 'bootstrap/dist/css/bootstrap.min.css';
import MyNav from './components/MyNav/MyNav.jsx'
import AllBooks from './components/Main/AllBooks.jsx';
import Footer from './components/Footer/Footer.jsx';
import { useState, useContext } from 'react';
import jsonData from './data/horror.json'
import { ThemeContext } from "./context/ThemeContextProvider";


function App() {
  
  //Imposto lo stato iniziale per creare poi l'input sulla barra di ricerca della navbar
  const [inputName, setInputName] = useState("");


  //Creo questa funzione per dare a setInputName il valore di quello che viene scritto nella barra di ricerca
  const navbarSearch = (event) => {
    setInputName(event.target.value);
  };


  //Questo serve per restituire a schermo i risultati dell'input di ricerca, tutto in caratteri minuscoli
  const searchResult = jsonData.filter((element) => {
    return element.title.toLowerCase().includes(inputName.toLowerCase());
  });

  //Applico il themeContext alla pagina principale
  const { theme } = useContext(ThemeContext);
  const appTheme = theme === "dark" ? "bg-dark" : "bg-light";


  return (

    //Per il bottone per il cambio tema
    <div className={appTheme}> 
           
      {/*Per passare le prop a MyNav per gestire la ricerca*/}
      <MyNav text={inputName} onSearchChange={navbarSearch}/>

      {/*Per dare a AllBooks i risultati del filtro di searchResult*/}
      <AllBooks results={searchResult}/>
      
      <Footer/>
    </div>
  );
}

export default App;

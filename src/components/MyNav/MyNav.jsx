import { Container, Navbar, Nav, Form } from "react-bootstrap";
import "./MyNav.css";
import React, { useContext } from 'react';
import { ThemeContext } from "../../context/ThemeContextProvider";


//Creo il component MyNav e ci passo come parametri il testo e la funzione che su app.jsx sono rispettivamente
//l'imputName che cambia col testo inserito e la funzione che gli assegna il valore
export default function MyNav ({ text, onSearchChange}) {


  //Applico il themeContext alla navbar
  const { theme } = useContext(ThemeContext);
  const navTheme = theme === "light" ? "bg-light" : "bg-dark";

  //Creo la navbar
  return (
    <Navbar className={navTheme}>
      <Container>

          <Nav className="pe-2">
            <Nav.Link href="#" className={theme === "dark" ? "color-dark" : "color-light"}>Home</Nav.Link>
            <Nav.Link href="#" className={theme === "dark" ? "color-dark" : "color-light"}>Hello</Nav.Link>
            <Nav.Link href="#" className={theme === "dark" ? "color-dark" : "color-light"}>WhatsUp?</Nav.Link>
          </Nav>

           {/*Per il costrutto della navbar per inserire la ricerca libro */}
          <Form.Control className='search-field' type="text" id="inputSearch" placeholder="Find something interesting..." aria-describedby='searchBooks' value={text} onChange={onSearchChange}/>  
      </Container>     
    
    </Navbar>
  )
}
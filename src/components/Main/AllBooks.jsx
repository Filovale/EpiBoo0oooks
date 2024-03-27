import { Container, Row, Col } from 'react-bootstrap';
import SingleBook from './SingleBook';
import ThemeButton from './ThemeButton';
import CommentArea from './Comment/CommentArea';
import React, { useContext } from 'react';
import { useState } from 'react';
import { ThemeContext } from "../../context/ThemeContextProvider";
import './AllBooks.css'

//Creo il component AllBooks e ci passo come param results in modo che faccia partire la serachResult filter di app.jsx
export default function AllBooks ({ results }) {     
    
    //Creo la funzione che fa cambiare tema qui poichè è il main che ha anche il bottone
    //useContext viene utilizzato per accedere al contesto di tema creato precedentemente
    //Restituisce il valore corrente del contesto, che contiene il tema e la funzione per impostarlo
    const { theme, setTheme } = useContext(ThemeContext);

    // Questa funzione cambia il tema tra "dark" e "light" utilizzando la funzione setTheme ottenuta dal contesto di tema
    const changeTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    //Questa variabile viene utilizzata per impostare la classe CSS del contenitore in base al tema corrente
    const containerTheme = theme === "dark" ? "bg-dark" : "bg-light";

    //Viene utilizzato lo stato locale selected per tener traccia del libro selezionato
    const [selected, setSelected] = useState(null);

    //Questa funzione viene chiamata quando un libro viene selezionato. Prende l'asin del libro selezionato e lo imposta come valore di selected
    const handleSelection = (asin) => {
        setSelected(asin);
    };

    return (
        <>
            <Container className={`mx-4 ${containerTheme}`}>

                {/*Bottone per cambiare il tema della pagina*/}     
                <ThemeButton changeTheme={changeTheme}/>  
                    <Row>
                        <Col xs={8} lg={8}>
                           <Row>
                                {/*All'interno di questa colonna viene mappata la lista results dei libri,
                                usando il componente SingleBook per ogni libro. Ogni SingleBook ha un'onSelect prop
                                che viene impostata su handleSelection quando un libro viene selezionato*/}
                                {results.map((book) => (
                                    <SingleBook key={book.asin} book={book} onSelect={handleSelection}/>
                                ))}
                            </Row> 
                        </Col>
                        <Col xs="4" lg="4">
                            {/*Viene mostrata un'area di commenti (CommentArea) solo se selected non è null */}
                            {selected && <CommentArea selectedBook={selected}/>}                            
                        </Col>
                    </Row>                        
            </Container>  
        </>
    )
}
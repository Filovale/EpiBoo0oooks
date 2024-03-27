import "./SingleBook.css"
import { Col, Card } from "react-bootstrap"
import React, { useContext , useState } from 'react';
import { ThemeContext } from "../../context/ThemeContextProvider";

// Viene definita una funzione SingleBook come componente React. Accetta due props: book, che rappresenta i dettagli del libro,
//e onSelect, una funzione che viene chiamata quando questo libro viene selezionato.
export default function SingleBook ( {book, onSelect} ) {

    //Viene utilizzato il hook useContext per accedere al contesto di tema. Viene estratto il valore del tema (theme) dal contesto.
    const {theme} = useContext(ThemeContext);

    //Vengono estratte le proprietà del libro
    const { img, title, price, asin} = book;

    // Aggiunta dello stato per il libro selezionato per colorarlo nel bordo quando selezionato
    const [selectedBook, setSelectedBook] = useState(null);

    //Quando il componente del libro viene cliccato, viene chiamata la funzione handleClick(),
    //che a sua volta chiama la funzione onSelect passando l'asin del libro selezionato.
    const handleClick = () => {

        // Se il libro selezionato è già quello corrente, deselezionalo
        if (selectedBook === asin) {
            setSelectedBook(null);
            return;
        }

        onSelect(asin);
        
        // Aggiornamento dello stato del libro selezionato
        setSelectedBook(asin);
    }

    //Viene reso il componente SingleBook. Questo componente è costituito da un Col di React Bootstrap che contiene una Card.
    //Il colore di sfondo e il testo della Card vengono impostati dinamicamente in base al tema corrente.
    //Il contenuto della Card include l'immagine del libro, il titolo e il prezzo.
    return (
        <>
        <Col sm={12} md={6} lg={6} className='g-4'>
            <Card className={`h-100 cursor-hover border-none ${theme === "dark" ? "back-color-dark" : "back-color-light"} ${selectedBook === asin ? "selected-book" : ""}`} onClick={handleClick}>
                <Card.Img src={img} className={`h-100`}/>
                <Card.Body className="p-2 d-flex flex-column align-items-center">
                    <Card.Title className={`fs-6 text-center ellipsis px-2 ${theme === "dark" ? "text-light" : "text-light"}`}>{title}</Card.Title>
                    <Card.Text className={`fw-lighter py-1 px-2 ${theme === "dark" ? "text-light" : "text-light"}`}>{price} €</Card.Text>
                </Card.Body>
            </Card>
        </Col> 
        </>
    )
}
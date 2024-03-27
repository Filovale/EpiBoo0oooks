import { Form, FloatingLabel, Button } from 'react-bootstrap'
import { useState } from "react";

//La componente riceve due props: selectedBook che rappresenta il libro selezionato per cui si sta aggiungendo il commento
//e onSubmitComment che è una funzione fornita dal genitore per inviare il nuovo commento.
export default function AddComment ( {selectedBook, onSubmitComment} ) {

    //Utilizza lo stato per tracciare il testo del commento (comment) e il voto (rate) forniti dall'utente.
    const [comment, setComment] = useState("");
    const [rate, setRate] = useState("");


    //Viene chiamata quando l'utente invia il modulo.
    //Impedisce il comportamento predefinito del modulo (ricarica della pagina).
    //Costruisce un oggetto postContent contenente il testo del commento, il voto e l'ID del libro.
    //Chiama la funzione onSubmitComment passando postContent come argomento per inviare il nuovo commento al genitore.
    function handleSubmit(e) {
        e.preventDefault();

        const postContent = {
            comment: `${comment}`, 
            rate: `${rate}`, 
            elementId: `${selectedBook}`
        };          

        onSubmitComment(postContent);
    };  

    return (
            <Form className="d-flex flex-column align-items-center gap-2 mt-5 p-3 background-color">
                <FloatingLabel controlId="floatingCommento" label="Insert a comment">
                    <Form.Control type="text" value={comment} onChange={(e) => setComment(e.target.value)}/>
                </FloatingLabel>  
                <FloatingLabel controlId="floatingRate" label="Rate 1 to 5">
                    <Form.Control type="number" max={5} value={rate} onChange={(e) => setRate(e.target.value)}/>
                </FloatingLabel>  
                <Button variant="success" type="submit" onClick={handleSubmit}>Post</Button>   
            </Form>                    
    )
}
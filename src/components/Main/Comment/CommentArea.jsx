import './CommentArea.css'
import CommentList from './CommentList'
import AddComment from './AddComment'
import { useState, useEffect } from "react";

//La componente riceve una prop chiamata selectedBook, che rappresenta il libro selezionato per visualizzare i commenti
export default function CommentArea ({ selectedBook }) {

    //Fetch commenti da renderizzare in CommentList:
    const APIget = `https://striveschool-api.herokuapp.com/api/books/${selectedBook}/comments/`;
   
    //Uno stato che conterrà i commenti recuperati dall'API.
    const [comments, setComments] = useState([]); 

    //Per eseguire un'operazione asincrona quando la prop selectedBook cambia
    //All'interno di questa funzione useEffect, viene effettuata una richiesta GET all'API per ottenere i commenti
    //relativi al libro selezionato. I commenti vengono quindi impostati nello stato comments.
    useEffect(() => {
        async function getComment() {
            try {
                const response = await fetch(APIget);
                const data = await response.json();
                setComments(data);
            } catch (error) {
                console.log('Error', error);
            }
        };
        
        //Controllo per evitare che la fetch venga eseguita senza dato asin:
        if (selectedBook) {
            getComment()
        };
    }, [selectedBook] );

    //Uno stato per controllare se i dati sono stati correttamente ricevuti
    const [dataReceived, setDataReceived] = useState(false);

    //Viene definita la funzione handleCommentSubmit, che riceve i dati del nuovo commento come parametro.
    //Quando un nuovo commento viene inviato tramite il componente AddComment,
    //questa funzione aggiunge il nuovo commento allo stato comments e imposta lo stato dataReceived su true.
    function handleCommentSubmit(commentData) {
        setComments([...comments, commentData]);
        setDataReceived(true);
    }

    //Viene utilizzato un altro useEffect che si attiva quando lo stato dataReceived cambia.
    //Quando dataReceived diventa true, viene eseguita una richiesta POST all'API per inviare l'ultimo commento aggiunto.
    useEffect(() => {
        if(dataReceived) {
            const lastComment = comments[comments.length -1];
            postComment(lastComment);
            setDataReceived(false);
        }
    }, [dataReceived, comments]);

    const APIpost = "https://striveschool-api.herokuapp.com/api/comments/";
    const key = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWRjNmIwNjY1MDNmNTAwMWE1ODc4OTQiLCJpYXQiOjE3MTE1NDE0OTEsImV4cCI6MTcxMjc1MTA5MX0.QMqGy8wGmS0NKrI9xTokdsRERE81t5PyYciYAyp0UAg"

    async function postComment(commentData) {
        try {
           await fetch(`${APIpost}`, {
                method: "POST", 
                headers: {
                   "Content-Type": "application/json",
                   "Authorization" : key
                }, 
                body: JSON.stringify(commentData)
            });
        } catch (error) {
            console.log("error")
        }
    };

    //La componente CommentArea restituisce due componenti figli: CommentList e AddComment.
    //CommentList visualizza i commenti presenti nello stato comments.
    //AddComment permette agli utenti di aggiungere nuovi commenti e utilizza la funzione handleCommentSubmit per gestire l'invio del commento.
    return (
        <div className='background-comment comment-area-height comment-area-fixed'>
            <CommentList className="mx-2" commentsToShow={comments} asinBook={selectedBook}/>
            <AddComment asinBook={selectedBook} onSubmitComment={handleCommentSubmit}/>        
        </div>
    )
}
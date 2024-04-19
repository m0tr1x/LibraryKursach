import {Button, Col, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getAvailableBooks, purchaseBook} from "../../api/api.tsx";
import Card from "react-bootstrap/Card";
import {IBook} from "../Interfaces/IBook.tsx";
import {jwtDecode} from "jwt-decode";



export function AllBooksPage()
{
    const [availableBooks, setAvailableBooks] = useState<IBook[]>([]);
    const token: string = localStorage.getItem('token')
    // Декодируем токен
    const decodedToken = jwtDecode(token);
    // Получаем необходимые поля из декодированного токена
    const id = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/id'];


    const handlePurchaseBook = async (bookId:number, userId:number) => {
        try {
            await purchaseBook(bookId,userId);
            loadAvailableBooks();
        } catch (error) {
            console.error('Ошибка при взятии книги:', error);
            // Обработка ошибки при взятии книги
        }
    };
    const loadAvailableBooks = async () => {
        try {
            const books =  await getAvailableBooks(); // Получаем доступные книги
            setAvailableBooks(books); // Обновляем состояние с данными о книгах
        } catch (error) {
            console.error('Ошибка при загрузке доступных книг:', error.message);
            // Обработка ошибки загрузки доступных книг
        }
    };

    useEffect(() => {
        // Загрузка доступных книг при монтировании компонента
        loadAvailableBooks();
    }, []);


    return(
        <>
            <div style={{marginLeft: '10px', marginRight: '10px'}}>
                <h1 style={{alignContent:"center"}}>Доступные книги</h1>
                <Row xs={2} md={2} lg={5} className="g-4" style={{marginTop:'15px'}}>
                    {availableBooks.map(book => (
                        <Col key={book.id}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>{book.title}</Card.Title>
                                    <Card.Text>
                                        {book.authorName}
                                    </Card.Text>
                                    <Button variant="primary" onClick={() => handlePurchaseBook(book.id,id)}>Забронировать книгу</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </>
    )
}
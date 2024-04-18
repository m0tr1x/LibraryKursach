import {Button, Col, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {Book} from "../Book.tsx";
import {getAvailableBooks, getBook} from "../../api/api.tsx";
import Card from "react-bootstrap/Card";
import {useNavigate} from "react-router-dom";


export function AllBooksPage()
{
    const navigate = useNavigate();
    const [availableBooks, setAvailableBooks] = useState<Book[]>([]);

    const handleLogout = () => {
        // Реализуйте код для выхода из аккаунта, например, удаление токена из локального хранилища
        localStorage.removeItem('token');
        navigate("/")
    }

    const handleTakeBook = async (bookId:number) => {
        try {
            await getBook(bookId);
            // Обработка успешного взятия книги
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
                                    <Button variant="primary" onClick={() => handleTakeBook(book.id)}>Взять книгу</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </>
    )
}
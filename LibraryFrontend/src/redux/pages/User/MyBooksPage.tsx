import {CardFooter, CardHeader, Col, ListGroupItem, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import {useEffect, useState} from "react";
import {IBook} from "../../Interfaces/IBook.tsx";
import {Button} from 'react-bootstrap';
import {getMyBooks, returnBook} from "../../../api/api.tsx";

export function MyBooksPage() {
    const [myBooks, setMyBooks] = useState<IBook[]>([]);


    const handleReturnBook = async (bookId: number) => {
        try {
            await returnBook(bookId);
            // Обработка успешного взятия книги
            loadMyBooksBooks();
        } catch (error) {
            console.error('Ошибка при взятии книги:', error);
            // Обработка ошибки при взятии книги
        }
    };
    const loadMyBooksBooks = async () => {
        try {
            const books = await getMyBooks(); // Получаем доступные книги
            setMyBooks(books); // Обновляем состояние с данными о книгах
        } catch (error) {
            console.error('Ошибка при загрузке доступных книг:', error.message);
            // Обработка ошибки загрузки доступных книг
        }
    };

    useEffect(() => {
        // Загрузка доступных книг при монтировании компонента
        loadMyBooksBooks();
    }, []);

    return (
        <>
            <div style={{marginLeft: '10px', marginRight: '10px'}}>
                <h1 style={{alignContent: "center"}}>Мои книги</h1>
                <Row xs={1} md={2} lg={5} className="g-4" style={{marginTop: '15px'}}>
                    {myBooks.map(book => (
                        <Col key={book.id}>
                            <Card style={{width: '18rem'}}>
                                <CardHeader>
                                    <Card.Title>{book.title}</Card.Title>
                                </CardHeader>
                                <Card.Body>
                                        <Card.Text style={{display: 'flex', justifyContent: 'center'}}>
                                            {book.author.name}
                                        </Card.Text>
                                    <CardFooter  style={{display: 'flex', justifyContent: 'center'}}>
                                        <Button variant="primary" onClick={() => handleReturnBook(book.id)}>Вернуть
                                            книгу</Button>
                                    </CardFooter>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>

        </>
    )
}
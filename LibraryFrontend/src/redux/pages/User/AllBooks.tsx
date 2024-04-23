import React, { useEffect, useState } from "react";
import { Button, CardFooter, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { getAvailableBooks } from "../../../api/api.tsx";
import Card from "react-bootstrap/Card";
import { IBook } from "../../Interfaces/IBook.tsx";
import { jwtDecode } from "jwt-decode";
import {fetchBooks, purchaseBookAction} from "../../Hooks/Actions.tsx";

export function AllBooksPage() {
    const [filteredBooks, setFilteredBooks] = useState<IBook[]>([]);

    const availableBooks = useSelector((state: any) => state.books);
    const dispatch = useDispatch();
    const [searchVal, setSearchVal] = useState("");
    const token: string = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const id = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/id'];

    const applyFilter = (booksToFilter: IBook[]) => {
        if (searchVal.trim() === '') {
            setFilteredBooks(booksToFilter);
        } else {
            const filtered = booksToFilter.filter(book =>
                book.title.toLowerCase().includes(searchVal.toLowerCase())
            );
            setFilteredBooks(filtered);
        }
    };

    const handlePurchaseBook = async (bookId: number, userId: number) => {
        try {
            dispatch(purchaseBookAction({ bookId: bookId, userId: userId }));
            loadAvailableBooks();
        } catch (error) {
            console.error('Ошибка при взятии книги:', error);
        }
    };

    const loadAvailableBooks = async () => {
        try {
            dispatch(fetchBooks());
            const books = await getAvailableBooks();
            applyFilter(books);
        } catch (error) {
            console.error('Ошибка при загрузке доступных книг:', error.message);
        }
    };

    useEffect(() => {
        loadAvailableBooks();
    }, []);

    const handleFilterClick = () => {
        applyFilter(availableBooks);
    };

    return (
        <>
            <div>
                <h1 style={{ alignContent: "center", marginLeft: '10px' }}>Доступные книги</h1>
            </div>
            <div style={{ marginLeft: '10px', marginTop: "20px", display: 'flex', alignItems: 'center' }}>
                <input
                    type="text"
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    placeholder="Поиск по названию"
                />
                <Button style={{ marginLeft: '20px' }} variant="primary" onClick={handleFilterClick}>Применить
                    фильтр</Button>
            </div>
            <div style={{ marginLeft: '10px', marginRight: '10px' }}>
                <Row xs={2} md={2} lg={5} className="g-4" style={{ marginTop: '15px' }}>
                    {filteredBooks.map(book => (
                        <Col key={book.id}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>{book.title}</Card.Title>
                                    <ListGroup>
                                        <ListGroupItem>
                                            <Card.Text>
                                                {book.author.name}
                                            </Card.Text>
                                        </ListGroupItem>
                                    </ListGroup>
                                </Card.Body>
                                <CardFooter style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button variant="primary" onClick={() => handlePurchaseBook(book.id, id)}>Забронировать
                                        книгу</Button>
                                </CardFooter>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </>
    )
}

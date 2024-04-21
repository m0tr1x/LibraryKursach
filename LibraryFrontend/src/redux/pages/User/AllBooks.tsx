import {Button, CardFooter, Col, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getAvailableBooks, purchaseBook} from "../../../api/api.tsx";
import Card from "react-bootstrap/Card";
import {IBook} from "../../Interfaces/IBook.tsx";
import {jwtDecode} from "jwt-decode";
import {IUser} from "../../Interfaces/IUser.tsx";



export function AllBooksPage()
{
    const [availableBooks, setAvailableBooks] = useState<IBook[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<IBook[]>([]);
    const [searchVal, setSearchVal] = useState("");
    const token: string = localStorage.getItem('token');
    // Декодируем токен
    const decodedToken = jwtDecode(token);
    // Получаем необходимые поля из декодированного токена
    const id = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/id'];




    const applyFilter = (booksToFilter: IBook[]) => {
        if (searchVal.trim() === '') {
            // Если поле фильтрации пустое, показываем все заказы
            setFilteredBooks(booksToFilter);
        } else {
            // Иначе фильтруем заказы по электронной почте пользователя
            const filtered = booksToFilter.filter(book =>
                book.title.toLowerCase().includes(searchVal.toLowerCase())
            );
            setFilteredBooks(filtered);
        }
    };

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
            applyFilter(books)
        } catch (error) {
            console.error('Ошибка при загрузке доступных книг:', error.message);
            // Обработка ошибки загрузки доступных книг
        }
    };

    useEffect(() => {
        // Загрузка доступных книг при монтировании компонента
        loadAvailableBooks();
    }, []);

    const handleFilterClick = () => {
        applyFilter(availableBooks);
    };

    return(
        <>
            <div>
                <h1 style={{alignContent: "center",marginLeft: '10px'}}>Доступные книги</h1>
            </div>
            <div style={{marginLeft: '10px', marginTop: "20px", display: 'flex', alignItems: 'center'}}>

                <input
                    type="text"
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    placeholder="Поиск по названию"
                />
                <Button style={{marginLeft: '20px'}} variant="primary" onClick={handleFilterClick}>Применить
                    фильтр</Button>
            </div>
            <div style={{marginLeft: '10px', marginRight: '10px'}}>
            <Row xs={2} md={2} lg={5} className="g-4" style={{marginTop: '15px'}}>
                    {filteredBooks.map(book => (
                        <Col key={book.id}>
                            <Card style={{width: '18rem'}}>
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
                                <CardFooter style={{display: 'flex', justifyContent: 'center'}}>
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
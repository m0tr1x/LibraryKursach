import { useEffect, useState } from "react";
import { getRental, giveBook } from "../../../api/api.tsx";
import { Button, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Message } from "../PopUpMessageSuccess.tsx";
import { IOrder } from "../../Interfaces/IOrder.tsx";



export function WorkerOrdersPage() {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [searchVal, setSearchVal] = useState("");
    const [filteredOrders, setFilteredOrders] = useState<IOrder[]>([]);

    const handleGiveBook = async (bookId: number, userId: number) => {
        try {
            const response = await giveBook(bookId, userId);
            console.log(response)
            setShowSuccessMessage(true);
            setSuccessMessage(response);
            loadOrders();
            setShowSuccessMessage(false);
        } catch (error) {
            console.error('Ошибка при выдаче книги:', error.message);
            // Обработка ошибки при выдаче книги
        }
    };

    const loadOrders = async () => {
        try {
            const ords = await getRental(); // Получаем все заказы
            setOrders(ords);
            applyFilter(ords); // Применяем фильтр к полученным заказам
        } catch (error) {
            console.error('Ошибка при загрузке заказов:', error.message);
            // Обработка ошибки загрузки заказов
        }
    };

    useEffect(() => {
        // Загрузка всех заказов при загрузке страницы
        loadOrders();
    }, []);

    const handleFilterClick = () => {
        applyFilter(orders);
    };

    const applyFilter = (ordersToFilter: IOrder[]) => {
        if (searchVal.trim() === '') {
            // Если поле фильтрации пустое, показываем все заказы
            setFilteredOrders(ordersToFilter);
        } else {
            // Иначе фильтруем заказы по электронной почте пользователя
            const filtered = ordersToFilter.filter(order =>
                order.user.email.toLowerCase().includes(searchVal.toLowerCase())
            );
            setFilteredOrders(filtered);
        }
    };



    return (
        <>
            <div style={{ marginLeft: '10px', marginRight: '10px' }}>
                <h1 style={{ alignContent: "center" }}>Выдача заказов</h1>
                <div>
                    <input
                        type="text"
                        value={searchVal}
                        onChange={(e) => setSearchVal(e.target.value)}
                        placeholder="Фильтр по email"
                    />
                    <Button style={{marginLeft:'20px'}}variant="primary" onClick={handleFilterClick}>Применить фильтр</Button>
                </div>
                <Row xs={2} md={2} lg={5} className="g-4" style={{ marginTop: '15px' }}>
                    {filteredOrders.map(order => (
                        <Col key={order.id}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>Заказ</Card.Title>
                                    <ListGroup>
                                        <ListGroupItem>Книга: {order.book.title}</ListGroupItem>
                                        <ListGroupItem>Автор: {order.book.author.name}</ListGroupItem>
                                        <ListGroupItem>Электронная почта пользователя: {order.user.email}</ListGroupItem>
                                    </ListGroup>
                                    <Card.Footer style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button variant="primary" style={{ margin: "auto" }} onClick={() => handleGiveBook(order.bookId, order.userId)}>Выдать книгу</Button>
                                    </Card.Footer>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </>
    )
}

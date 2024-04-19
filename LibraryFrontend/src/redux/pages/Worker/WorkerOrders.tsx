import {useEffect, useState} from "react";
import {getAvailableBooks, getRental, giveBook,} from "../../../api/api.tsx";
import {Button, Col, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import {Message} from "../PopUpMessageSuccess.tsx";
import {IOrder} from "../../Interfaces/IOrder.tsx";


export function WorkerOrdersPage()
{
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [orders, setOrders] = useState<IOrder[]>([]);

    const handleGiveBook = async (bookId: number, userId: number) => {
        try {
            const response = await giveBook(bookId, userId);
            setShowSuccessMessage(true);
            setSuccessMessage(response.data);
            loadOrders();
        } catch (error) {
            console.error('Ошибка при выдаче книги:', error.message);
            // Обработка ошибки при выдаче книги
        }
    };

    const loadOrders = async () => {
        try {
            const ords =  await getRental(); // Получаем доступные книги
            console.log(ords)
            setOrders(ords); // Обновляем состояние с данными о книгах
        } catch (error) {
            console.error('Ошибка при загрузке доступных книг:', error.message);
            // Обработка ошибки загрузки доступных книг
        }
    };

    useEffect(() => {
        // Загрузка доступных книг при монтировании компонента
        loadOrders();
    }, []);

    return(
        <>
            <div style={{marginLeft: '10px', marginRight: '10px'}}>
                <h1 style={{alignContent: "center"}}>Выдача заказов</h1>
                <Row xs={2} md={2} lg={5} className="g-4" style={{marginTop: '15px'}}>
                    {orders.map(order => (
                        <Col key={order.id}>
                            <Card style={{width: '18rem'}}>
                                <Card.Body>
                                    <Card.Title>{order.status}</Card.Title>
                                    <Card.Text>
                                        {order.book.title} {order.user.email}
                                    </Card.Text>
                                    <Button variant="primary" onClick={() => handleGiveBook(order.bookId,order.userId)}>Выдать
                                        книгу</Button>
                                </Card.Body>
                            </Card>
                            {showSuccessMessage && <Message message={successMessage} />}
                        </Col>
                    ))}
                </Row>
            </div>
        </>
    )
}
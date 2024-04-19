import {Nav} from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';

import Card from "react-bootstrap/Card";
import {Link} from "react-router-dom";
import {logOut} from "../../api/api.tsx";

export function UserPage() {

    const token: string = localStorage.getItem('token')
    // Декодируем токен
    const decodedToken = jwtDecode(token);


    // Получаем необходимые поля из декодированного токена
    const id = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/id'];
    const role  = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    const email = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
    const name = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];



    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <Card border={"primary"} >
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{email}</Card.Subtitle>
                        <Nav variant="tabs" defaultActiveKey="/home">
                            {role === 'Admin' && (
                                <Nav.Item>
                                    <Nav.Link as={Link} to="/admin/createworker">Добавить работника</Nav.Link>
                                    <Nav.Link as={Link} to="/admin/allusers">Все пользователи в библиотеке</Nav.Link>
                                    <Nav.Link as={Link} to="/" onClick={() => logOut()}>Выйти из аккаунта</Nav.Link>
                                </Nav.Item>
                            )}
                            {role === 'User' && (
                                <Nav.Item>
                                    <Nav.Link as={Link} to="/user/allbooks">Все доступные книги в библиотеке</Nav.Link>
                                    <Nav.Link as={Link} to="/user/mybooks">Все мои книги</Nav.Link>
                                    <Nav.Link as={Link} to="/" onClick={() => logOut()}>Выйти из аккаунта</Nav.Link>
                                </Nav.Item>
                            )}
                            {role === 'Worker' && (
                                <>
                                    <Nav.Link as={Link} to="/worker/orders">Выдача заказов</Nav.Link>
                                    <Nav.Link as={Link} to="/" onClick={() => logOut()}>Выйти из аккаунта</Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}

import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';
import {useEffect, useState} from "react";
import {Form} from "react-bootstrap";
import {login, register} from "../../api/api.tsx";
import {Message} from "./PopUpMessageSuccess.tsx";
import {useNavigate} from "react-router-dom";
import {validate} from "react-email-validator";



export function HomePage() {
    const [activeTab, setActiveTab] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();



    const handleLogin = async () => {
        try {
            const response = await login(email, password); // Вызываем метод login из API
            localStorage.setItem('token', response)
            navigate("/user")
        } catch (error) {
            if (error.status === undefined) {
                setShowSuccessMessage(true); // Показываем попап сообщения об успешной регистрации
                setSuccessMessage('Неверная почта или пароль');
            }
            console.error('Login error:', error.message);
            // Обработка ошибки входа
        }
    };

    useEffect(() => {

        if (localStorage.getItem('token') !== null) {
            navigate("/user")
        }
    }, []);

    const handleRegister = async () => {
        try {
            const response = await register(name, email, password, 0); // Вызываем метод register из API
            setShowSuccessMessage(true); // Показываем попап сообщения об успешной регистрации
            setSuccessMessage(response.data); // Устанавливаем сообщение для компонента Message
        } catch (error) {
            console.error('Register error:', error.message);
            // Обработка ошибки регистрации
        }
    };



    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh'}}>
            <Card border="primary" style={{width: '18rem'}}>
                <Card.Header>Добро пожаловать</Card.Header>
                <Card.Body>
                    {activeTab === 'login' ? (
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Электронная почта</Form.Label>
                                <Form.Control type="email" placeholder="Введите почту" value={email}
                                              onChange={(e) => setEmail(e.target.value)}
                                                isInvalid={!validate(email)}// Подсвечиваем поле, если введенный адрес некорректен
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Пароль</Form.Label>
                                <Form.Control type="password" placeholder="Введите пароль" value={password}
                                              onChange={(e) => setPassword(e.target.value)}/>
                            </Form.Group>

                            <Button disabled={!validate(email)} variant="primary" type="button" onClick={handleLogin}>
                                Войти
                            </Button>
                        </Form>
                    ) : (
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Имя</Form.Label>
                                <Form.Control type="text" placeholder="Введите имя" value={name}
                                              onChange={(e) => setName(e.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Электронная почта</Form.Label>
                                <Form.Control type="email" placeholder="Введите электронную почту" value={email}
                                              onChange={(e) => setEmail(e.target.value)}
                                              isInvalid={!validate(email)}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Пароль</Form.Label>
                                <Form.Control type="password" placeholder="Введите пароль" value={password}
                                              onChange={(e) => setPassword(e.target.value)}/>
                            </Form.Group>

                            <Button disabled={!validate(email)} variant="primary" type="button" onClick={handleRegister}>
                                Зарегистрироваться
                            </Button>
                        </Form>
                    )}
                </Card.Body>
                <Card.Footer>
                    <Button variant="link" onClick={() => setActiveTab('login')}>
                        Вход
                    </Button>
                    <Button variant="link" onClick={() => setActiveTab('register')}>
                        Регистрация
                    </Button>
                </Card.Footer>
            </Card>
            {showSuccessMessage && <Message message={successMessage}/>}
        </div>
    );
}


import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';
import {useState} from "react";
import {Form} from "react-bootstrap";


export function HomePage()
{
    const [activeTab, setActiveTab] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleLogin = () => {
        // Обработка входа
    };

    const handleRegister = () => {
        // Обработка регистрации
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <Card  border="primary" style={{ width: '18rem'}}>
                <Card.Header>Добро пожаловать</Card.Header>
                <Card.Body>
                    {activeTab === 'login' ? (
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Электронная почта</Form.Label>
                                <Form.Control type="email" placeholder="Введите имя" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Пароль</Form.Label>
                                <Form.Control type="password" placeholder="Введите пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>

                            <Button variant="primary" type="submit" onClick={handleLogin}>
                                Вход
                            </Button>
                        </Form>
                    ) : (
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Имя</Form.Label>
                                <Form.Control type="text" placeholder="Введите имя" value={name} onChange={(e) => setName(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Электронная почта</Form.Label>
                                <Form.Control type="email" placeholder="Введите электронную почту" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Пароль</Form.Label>
                                <Form.Control type="password" placeholder="Введите пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>

                            <Button variant="primary" type="submit" onClick={handleRegister}>
                                Регистрация
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
        </div>
    );
}
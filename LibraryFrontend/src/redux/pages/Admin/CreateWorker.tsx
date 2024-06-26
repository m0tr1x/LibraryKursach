import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useEffect, useState} from "react";
import {Message} from "../PopUpMessageSuccess.tsx";
import {register} from "../../../api/api.tsx";
import Card from "react-bootstrap/Card";
import {useNavigate} from "react-router-dom";

export function CreateWorkerPage()
{
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const response = await register(name, email, password,1); // Вызываем метод register из API
            setShowSuccessMessage(true); // Показываем попап сообщения об успешной регистрации
            setSuccessMessage(response.data); // Устанавливаем сообщение для компонента Message
        } catch (error) {
            console.error('Register error:', error.message);
            // Обработка ошибки регистрации
        }
    };

    useEffect(() => {
        if (localStorage.getItem('token') == null) {
            navigate("/")
        }
    }, []);

    return(
    <>
        <Card border={"light"} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', width:'auto'}}>
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

                <Button variant="primary" type="button" onClick={handleRegister}>
                    Создать работника
                </Button>
                {showSuccessMessage && <Message message={successMessage} />}
            </Form>
        </Card>
    </>
    )
}
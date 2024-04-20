import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useState} from "react";
import {Message} from "../PopUpMessageSuccess.tsx";
import {register} from "../../../api/api.tsx";

export function CreateWorkerPage()
{
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

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

    return(
    <>
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
                Зарегистрироваться
            </Button>
            {showSuccessMessage && <Message message={successMessage} />}
        </Form>
    </>
    )
}
import { Table } from "react-bootstrap";
import { getAllUsers, changeUserData } from "../../api/api.tsx";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Role } from "../Interfaces/Role.tsx";
import { IUser } from "../Interfaces/IUser.tsx";

export function AllUsersPage() {
    const [allUsers, setAllUsers] = useState<IUser[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState<IUser | null>(null);
    const [editedFields, setEditedFields] = useState<Partial<IUser>>({});

    const handleEditClick = (user: IUser) => {
        setIsEditing(!isEditing); // Переключаем состояние редактирования
        setEditedUser(user); // Устанавливаем пользователя для редактирования
    };

    const handleFinishEditingClick = async () => {
        try {
            if (editedUser) {
                const updatedUser = { ...editedUser, ...editedFields }; // Объединяем пользовательские данные и измененные поля
                await changeUserData(editedUser.id, updatedUser); // Обновляем данные пользователя на сервере
                setIsEditing(false); // Завершаем редактирование
                setEditedUser(null); // Сбрасываем данные о редактируемом пользователе
                setEditedFields({}); // Сбрасываем измененные поля
                await loadAllUsers(); // Обновляем список пользователей после успешного обновления данных
            }
        } catch (error) {
            console.error('Ошибка при обновлении данных пользователя:', error.message);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedFields({ ...editedFields, [name]: value }); // Обновляем измененное поле
    };

    const loadAllUsers = async () => {
        try {
            const users = await getAllUsers(); // Получаем список пользователей с сервера
            setAllUsers(users); // Обновляем состояние списка пользователей
        } catch (error) {
            console.error('Ошибка при загрузке пользователей:', error.message);
        }
    };

    useEffect(() => {
        loadAllUsers(); // Вызываем загрузку списка пользователей при монтировании компонента
    }, []);

    return (
        <>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Имя</th>
                    <th>Почта</th>
                    <th>Роль</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {allUsers.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>
                            {isEditing && editedUser === user ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={editedFields.name || user.name}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                user.name
                            )}
                        </td>
                        <td>
                            {isEditing && editedUser === user ? (
                                <input
                                    type="text"
                                    name="email"
                                    value={editedFields.email || user.email}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                user.email
                            )}
                        </td>
                        <td>{Role[user.userRole]}</td>
                        <td>
                            {!isEditing || user !== editedUser ? (
                                <Button variant="info" onClick={() => handleEditClick(user)}>
                                    Редактировать
                                </Button>
                            ) : (
                                <Button variant="success" onClick={handleFinishEditingClick}>
                                    Завершить редактирование
                                </Button>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </>
    );
}

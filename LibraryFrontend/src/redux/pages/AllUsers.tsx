import { Table, Button } from "react-bootstrap";
import { getAllUsers, changeUserData, deleteUser } from "../../api/api";
import { useEffect, useState } from "react";
import { Role } from "../Interfaces/Role";
import { IUser } from "../Interfaces/IUser";
// Остальные импорты...

export function AllUsersPage() {
    const [allUsers, setAllUsers] = useState<IUser[]>([]);
    const [editedUser, setEditedUser] = useState<IUser | null>(null);
    const [editedFields, setEditedFields] = useState<Partial<IUser>>({});

    const handleEditClick = (user: IUser) => {
        setEditedUser(user);
        setEditedFields(user); // Заполнение изменяемых полей текущими данными пользователя
    };

    const handleDeleteClick = async (userId: number) => {
        try {
            await deleteUser(userId);
            await loadAllUsers();
        } catch (error) {
            console.error('Ошибка при удалении пользователя:', error.message);
        }
    };

    const handleFinishEditingClick = async () => {
        try {
            if (editedUser) {

                const userRoleValue = Role[editedFields.userRole]; // Получаем числовое значение роли по строковому значению
                console.log(editedUser.id, editedFields.email, editedFields.name, userRoleValue)
                await changeUserData(editedUser.id, editedFields.email, editedFields.name, userRoleValue);

                setEditedUser(null);
                setEditedFields({});
                await loadAllUsers();
            }
        } catch (error) {
            console.error('Ошибка при обновлении данных пользователя:', error.message);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedFields({ ...editedFields, [name]: value });
    };

    const loadAllUsers = async () => {
        try {
            const users = await getAllUsers();
            setAllUsers(users);
        } catch (error) {
            console.error('Ошибка при загрузке пользователей:', error.message);
        }
    };

    useEffect(() => {
        loadAllUsers();
    }, []);

    return (
        <>
            {/* Таблица пользователей */}
            <Table striped bordered hover>
                {/* Заголовки таблицы */}
                <thead>
                <tr>
                    <th>#</th>
                    <th>Имя</th>
                    <th>Почта</th>
                    <th>Роль</th>
                    <th>Действия</th>
                </tr>
                </thead>
                {/* Тело таблицы */}
                <tbody>
                {allUsers.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>
                            {editedUser === user ? (
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
                            {editedUser === user ? (
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
                        <td>
                            {/* Редактирование роли пользователя */}
                            {editedUser === user ? (
                                <select
                                    name="userRole"
                                    value={editedFields.userRole || user.userRole}
                                    onChange={handleInputChange}
                                >
                                    <option value="User">Пользователь</option>
                                    <option value="Worker">Работник</option>
                                    <option value="Admin">Администратор</option>
                                </select>
                            ) : (
                                Role[user.userRole]
                            )}
                        </td>
                        <td>
                            {/* Кнопки действий */}
                            {editedUser === user ? (
                                <Button variant="success" onClick={handleFinishEditingClick}>
                                    Завершить редактирование
                                </Button>
                            ) : (
                                <>
                                    <Button variant="info" onClick={() => handleEditClick(user)}>
                                        Редактировать
                                    </Button>
                                    <Button style={{ marginLeft: "15px" }} variant="danger" onClick={() => handleDeleteClick(user.id)}>
                                        Удалить
                                    </Button>
                                </>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </>
    );
}

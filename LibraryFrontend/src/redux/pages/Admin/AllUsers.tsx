import {Table, Button} from "react-bootstrap";
import {getAllUsers, changeUserData, deleteUser} from "../../../api/api.tsx";
import {useEffect, useState} from "react";
import {Role} from "../../Interfaces/Role.tsx";
import {IUser} from "../../Interfaces/IUser.tsx";


export function AllUsersPage() {
    const [editedUser, setEditedUser] = useState<IUser | null>(null);
    const [editedName, setEditedName] = useState("");
    const [editedEmail, setEditedEmail] = useState("");
    const [editedRole, setEditedRole] = useState("");
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [active, setActive] = useState('still');
    const [allUsers, setAllUsers] = useState<IUser[]>([]);


    const handleEditClick = (user: IUser) => {
        setEditedUser(user);
        setActive('change')
    };

    const handleDeleteClick = async (userId: number) => {
        try {
            await deleteUser(userId);
            await loadAllUsers();
        } catch (error) {
            errorMessage(error.message)
            console.error('Ошибка при удалении пользователя:', error.message);
        }
    };

    const handleFinishEditingClick = async () => {
        try {
            const newName = editedName.trim() !== "" ? editedName : editedUser?.name;
            const newEmail = editedEmail.trim() !== "" ? editedEmail : editedUser?.email;
            const newRole = editedRole.trim() !== "" ? editedRole : editedUser?.userRole.toString();

            await changeUserData(editedUser?.id, newName, newEmail, newRole)
            setShowErrorMessage(false)
        } catch
            (error) {
            setErrorMessage(error.message)
            console.error('Ошибка при обновлении данных пользователя:', error.message);
        }
    };


const loadAllUsers = async () => {
    try {
        const response = await getAllUsers();
        setAllUsers(response)

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
                                value={editedName}
                                onChange={(e)  => setEditedName(e.target.value)}
                            />
                        ) : (
                            user.name
                        )}
                    </td>
                    <td>
                        {active === 'change' ?(
                            <input
                                type="text"
                                name="email"
                                value={editedEmail}
                                onChange={(e)  => setEditedEmail(e.target.value)}
                            />
                        ) : (
                            user.email
                        )}
                    </td>
                    <td>
                        {/* Редактирование роли пользователя */}
                        {active === 'change' ?(
                            <select
                                name="userRole"
                                value={editedRole}
                                onChange={(e)  => setEditedRole(e.target.value)}
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
                        {active === 'change' ? (
                            <Button variant="success" onClick={handleFinishEditingClick}>
                                Завершить редактирование
                            </Button>
                        ) : (
                            <>
                                <Button variant="info" onClick={() => handleEditClick(user)}>
                                    Редактировать
                                </Button>
                                <Button style={{marginLeft: "15px"}} variant="danger"
                                        onClick={() => handleDeleteClick(user.id)}>
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
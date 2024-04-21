import {Table, Button, Modal, Form, Alert} from "react-bootstrap";
import {changeUserData, deleteUser,  getAllUsers} from "../../../api/api.tsx";
import {useEffect, useState} from "react";
import {IUser} from "../../Interfaces/IUser.tsx";
import {Role} from "../../Interfaces/Role.tsx";
import {IBook} from "../../Interfaces/IBook.tsx";


export function AllUsersPage() {
    const [allUsers, setAllUsers] = useState<IUser[]>([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [editedUser, setEditedUser] = useState<IUser | null>(null);
    const [editName, setEditName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editRole, setEditRole] = useState("");
    const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
    const [searchVal, setSearchVal] = useState("");


    const applyFilter = (usersToFilter: IUser[]) => {
        if (searchVal.trim() === '') {
            // Если поле фильтрации пустое, показываем все заказы
            setFilteredUsers(usersToFilter);
        } else {
            // Иначе фильтруем заказы по электронной почте пользователя
            const filtered = usersToFilter.filter(usr =>
                usr.email.toLowerCase().includes(searchVal.toLowerCase())
            );
            setFilteredUsers(filtered);
        }
    };
    const handleDeleteClick = async (userId: number) => {
        try {
            await deleteUser(userId);
            await loadAllUsers();
        } catch (error) {
            setErrorMessage(error.message)
            console.error('Ошибка при удалении пользователя:', error.message);
        }
    };
    const handleFilterClick = () => {
        applyFilter(allUsers);
    };

    const handleSaveChanges = async () => {
        try{
            const newName = editName.trim() !== "" ? editName : editedUser?.name;
            const newEmail = editEmail.trim() !== "" ? editEmail : editedUser?.email;
            const newRole = editRole.trim() !== "" ? editRole : editedUser?.userRole;

            await changeUserData(editedUser.id,newEmail, newName,  newRole);
            // Закрытие модального окна редактирования
            setShowEditModal(false);
            setShowErrorMessage(false);
            // Обновление данных после редактирования книги
            loadAllUsers();
        }
        catch (error)
        {
            setShowErrorMessage(true);
            setErrorMessage(error.message); // Предполагается, что сообщение об ошибке приходит с сервера
            console.error("Ошибка при редактировании книги:", error);
        }

    };


    const loadAllUsers = async () => {
        try {
            const response = await getAllUsers();
            setAllUsers(response);
            applyFilter(response);
        } catch (error) {
            console.error('Ошибка при загрузке пользователей:', error.message);
        }
    };



    const handleEditClick = async (user: IUser) => {
        setShowEditModal(true);
        setEditedUser(user);
        setEditName(user.name);
        setEditEmail(user.email);
        setEditRole(user.userRole.toString());
    };


    const handleCloseEditModal = () => setShowEditModal(false);


    useEffect(() => {
        loadAllUsers();
    }, []);

    return (
        <>
            <div style={{marginLeft: '5px', marginTop: "20px", display: 'flex', alignItems: 'center'}}>
                <input
                    type="text"
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    placeholder="Поиск по email"
                />
                <Button style={{marginLeft: '20px'}} variant="primary" onClick={handleFilterClick}>Применить
                    фильтр</Button>
            </div>
            {/* Таблица пользователей */}
            <Table striped bordered hover style={{marginTop:'20px'}}>
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
                {filteredUsers.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                            {user.userRole} ({Role[user.userRole]})
                        </td>
                        <td>
                            <>
                                <Button variant="primary" onClick={() => handleEditClick(user)}>
                                    Редактировать
                                </Button>
                                <Button style={{marginLeft: "15px"}} variant="danger"
                                        onClick={() => handleDeleteClick(user.id)}>
                                    Удалить
                                </Button>
                            </>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Редактировать пользователя</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBookTitle">
                            <Form.Label>Имя пользователя</Form.Label>
                            <Form.Control type="text" placeholder={editedUser?.name}
                                          onChange={(e) => setEditName(e.target.value)}/>
                        </Form.Group>
                        <Form.Group controlId="formBookAuthor">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" placeholder={editedUser?.email}
                                          onChange={(e) => setEditEmail(e.target.value)}/>
                        </Form.Group>
                        <Form.Group controlId="formBookGenre">
                            <Form.Label>Роль</Form.Label>
                            <Form.Control type="text" placeholder={editedUser?.userRole.toString()}
                                          onChange={(e) => setEditRole(e.target.value)}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEditModal}>Закрыть</Button>
                    <Button style={{marginLeft: "20px"}} variant="primary"
                            onClick={handleSaveChanges}>Применить</Button>
                </Modal.Footer>
                <div style={{width: 'auto', margin: 'auto'}}>
                    {showErrorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                </div>
            </Modal>
        </>
    );
}
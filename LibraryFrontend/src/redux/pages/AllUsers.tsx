import {Table} from "react-bootstrap";
import {getAllUsers} from "../../api/api.tsx";
import {useEffect, useState} from "react";
import {IUser} from "../Interfaces/IUser.tsx";
import Button from "react-bootstrap/Button";
import {Role} from "../Interfaces/Role.tsx";


export function AllUsersPage()
{
    const [allUsers, setAllUsers] = useState<IUser[]>([]);
    const loadAllUsers = async () => {
        try {
            const users =  await getAllUsers(); // Получаем доступные книги
            console.log(users)
            setAllUsers(users); // Обновляем состояние с данными о книгах
        } catch (error) {
            console.error('Ошибка при загрузке доступных книг:', error.message);
            // Обработка ошибки загрузки доступных книг
        }
    };

    useEffect(() => {
        // Загрузка доступных книг при монтировании компонента
        loadAllUsers();
    }, []);

    return(
        <>
            <Table striped="columns">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
                </thead>
                <tbody>
                {allUsers.map(user => (
                    <tr>
                        <td>{user.id}</td>
                        <td>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                {user.name}
                                <Button style={{marginLeft: "auto"}}>Редактировать</Button>
                            </div>
                        </td>
                        <td>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                {user.email}
                                <Button style={{marginLeft: "auto"}}>Редактировать</Button>
                            </div>
                        </td>
                        <td>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                {user.userRole} ({Role[user.userRole]})
                                <Button style={{marginLeft: "auto"}}>Редактировать</Button>
                            </div>
                        </td>
                    </tr>
                ))}

                </tbody>
            </Table>
        </>
    )
}
import axios from 'axios';
import {Role} from "../redux/Interfaces/Role.tsx";
import {IUser} from "../redux/Interfaces/IUser.tsx";


export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post('http://localhost:5169/api/AuthConroller/login', {email, password},
            {
                headers: {
                    'Content-type': 'application/json'
                }
            });
        const token = response.data; // Предполагается, что токен возвращается в свойстве token
        return token;
    } catch (error) {

        throw new Error('Unauthorized');
    }
};


export const register = async (name: string, email: string, password: string, role: number) => {
    try {
        const response = await axios.post('http://localhost:5169/api/Home/register', {name, email, password, role});
        return response;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};
export const getAvailableBooks = async () => {
    try {
        const responce = await axios.get('http://localhost:5169/api/User/available-books', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
        return responce.data;

    } catch (error) {
        throw new Error(error.response.data.message())
    }
};

export const getMyBooks = async () => {
    try {
        const responce = await axios.get('http://localhost:5169/api/User/my-books', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
        return responce.data;

    } catch (error) {
        throw new Error(error.response.data.message())
    }
};

export const purchaseBook = async (bookId: number, userId: number) => {
    try {
        const responce = await axios.post(`http://localhost:5169/api/User/purshace-book/bookId=${bookId}`, {bookId,userId}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
        return responce.data;

    } catch (error) {
        throw new Error(error.response.data.message())
    }
};
export const returnBook = async (bookId: number) => {
    try {
        const responce = await axios.post(`http://localhost:5169/api/User/return-book/bookId=${bookId}`, null, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
        return responce.data;

    } catch (error) {
        throw new Error(error.response.data.message())
    }
};

export const logOut = async () => {
    try {
        localStorage.removeItem('token');
    } catch (error) {
        throw new Error(error.message)
    }
}

export const getAllUsers = async () => {
    try {
        const responce = await axios.get(`http://localhost:5169/api/Admin/all-users`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
        return responce.data;

    } catch (error) {
        throw new Error(error.response.data.message())
    }
}

export const changeUserData = async (userId:number, email: string, name:string, role:Role) => {
    try {
        const response = await axios.put(`http://localhost:5169/api/Admin/edit-user/userId=${userId}`, {email,name,role}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message());
    }
};

export const deleteUser= async (userId: number) =>{
    try{
        const response = await axios.delete(`http://localhost:5169/api/Admin/delete-user/userId=${userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    }
    catch (error)
    {
        throw new Error(error.response.data.message())
    }
}

export const getRental= async () =>{
    try{
        const response = await axios.get(`http://localhost:5169/api/Worker/all-rental-operations`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    }
    catch (error)
    {
        throw new Error(error.response.data.message())
    }
}

export const giveBook = async(bookId: number, userId: number) =>
{
    try {
        const responce = await axios.post(`http://localhost:5169/api/Worker/give-book/bookId=${bookId}&userId=${userId}`, {bookId, userId}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
        return responce.data;

    }
    catch (error)
    {
        throw new Error(error.response.data.message())
    }
}




import axios, {AxiosError} from 'axios';
import {Role} from "../redux/Interfaces/Role.tsx";



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
    } catch (error: AxiosError) {

        throw new Error('Unauthorized');
    }
};


export const register = async (name: string, email: string, password: string, role: number) => {
    try {
        const response = await axios.post('http://localhost:5169/api/Home/register', {name, email, password, role});
        return response;
    } catch (error : AxiosError) {
        throw new Error(error.response.data.message);
    }
};
export const getAvailableBooks = async () => {
    try {
        const responce = await axios.get('http://localhost:5169/api/Home/available-books', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
        return responce.data;

    } catch (error: AxiosError) {
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
        throw new Error(error.response.data)
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

    } catch (error: AxiosError) {
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

    } catch (error: AxiosError) {
        throw new Error(error.response.data.message())
    }
};

export const logOut = async () => {
    try {
        localStorage.removeItem('token');
    } catch (error: AxiosError) {
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

    } catch (error: AxiosError) {
        throw new Error(error.response.data)
    }
}

export const changeUserData = async (userId:number, email: string, name:string, role:number) => {
    try {
        const response = await axios.put(`http://localhost:5169/api/Admin/edit-user/userId=${userId}&&name=${name}&&email=${email}&&role=${role}`, {userId,email,name,role}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error: AxiosError) {
        throw new Error(error.response.data);
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
    catch (error: AxiosError)
    {
        throw new Error(error.response.data)
    }
};

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
    catch (error: AxiosError)
    {
        throw new Error(error.response.data)
    }
};

export const addBook = async (title: string, author: string, genre: string) => {
    try {
        const response = await axios.post(`http://localhost:5169/api/Worker/add-book`, { title, author, genre }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;

    } catch (error: AxiosError) {
        console.log(error.response.data)
        throw new Error(error.response.data);
    }
}


export const addAuthor = async (title: string) => {
    try {
        const response = await axios.post(`http://localhost:5169/api/Worker/add-author/authorName=${title}`, { title }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;

    }catch (error: AxiosError) {
        console.log(error.response.data)
        throw new Error(error.response.data);
    }
}


export const addGenre = async (title: string) => {
    try {
        const response = await axios.post(`http://localhost:5169/api/Worker/add-genre/genreName=${title}`, { title}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;

    } catch (error: AxiosError) {
        console.log(error.response.data)
        throw new Error(error.response.data);
    }
}


export const deleteBook= async (bookId: number) =>{
    try{
        const response = await axios.delete(`http://localhost:5169/api/Worker/delete-book/bookId=${bookId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    }
    catch (error: AxiosError) {
        console.log(error.response.data)
        throw new Error(error.response.data);
    }
}


export const editBook = async(bookId: number, title:string, author:string,genre:string) =>{
    try {
        const response = await axios.put(`http://localhost:5169/api/Worker/edit-book/bookId=${bookId}&&title=${title}&&author=${author}&&genre=${genre}`, {bookId, title,author,genre},{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
        return response.data
    }
    catch (error: AxiosError) {
        console.log(error.response.data)
        throw new Error(error.response.data);
    }
}




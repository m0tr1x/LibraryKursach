import axios from 'axios';



export const login = async (email: string, password: string) => {
    try {

        const response = await axios.post('http://localhost:5169/api/AuthConroller/login', {email, password},
            {headers: {
                'Content-type' : 'application/json'
            }});

        const token = response.data; // Предполагается, что токен возвращается в свойстве token
        return token;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};


export const register = async (name: string, email: string, password: string) => {
    try {
        const response = await axios.post('http://localhost:5169/api/Home/register', { name, email, password });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

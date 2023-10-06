import axios from 'axios';

const instance = axios.create({
    baseURL: "http://localhost:5000/api/users",
});

export default instance;
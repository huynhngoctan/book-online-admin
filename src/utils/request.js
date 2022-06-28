import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
});

export const get = async (path, options = {}) => {
    const response = await request.get(path, options);
    return response.data;
};

export default request;

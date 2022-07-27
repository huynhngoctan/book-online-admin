import * as request from '~/utils/request';

export const getUsers = async () => {
    try {
        const res = await request.get('/users');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const getUser = async (userId) => {
    try {
        const res = await request.get(`/users/${userId}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const checkUsername = async (username) => {
    try {
        const res = await request.get('/users/findUsername', {
            params: {
                username,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const createUser = async (user) => {
    try {
        const res = await request.post('/users', user);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const updateUser = async (id, user) => {
    try {
        const res = await request.put(`/users/${id}`, user);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const deleteUser = async (id) => {
    try {
        const res = await request.deletes(`/users/${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const uploadAvatar = async (file) => {
    try {
        let formdata = new FormData();
        formdata.append('file', file);
        const res = await request.post('/FileUpload', formdata, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

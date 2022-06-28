import * as request from '~/utils/request';

export const getUsers = async () => {
    try {
        const res = await request.get('/users');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

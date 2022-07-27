import * as request from '~/utils/request';

export const getOrders = async () => {
    try {
        const res = await request.get('/orders');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getOrder = async (id) => {
    try {
        const res = await request.get(`/orders/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateOrder = async (id, order) => {
    try {
        const res = await request.put(`/orders/${id}`, order);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const deleteOrder = async (id) => {
    try {
        const res = await request.deletes(`/orders/${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

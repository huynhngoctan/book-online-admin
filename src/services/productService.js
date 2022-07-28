import * as request from '~/utils/request';

export const getProducts = async () => {
    try {
        const res = await request.get('/products');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getProduct = async (id) => {
    try {
        const res = await request.get(`/products/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const searchProduct = async (q) => {
    try {
        const res = await request.get('/products/search', {
            params: {
                q,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const checkName = async (name) => {
    try {
        const res = await request.get('/products/findName', {
            params: {
                name,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const createProduct = async (product) => {
    try {
        const res = await request.post('/products', product);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const updateProduct = async (id, product) => {
    try {
        const res = await request.put(`/products/${id}`, product);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const deleteProduct = async (id) => {
    try {
        const res = await request.deletes(`/products/${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const uploadImage = async (file) => {
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

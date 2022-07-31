import EditOrder from '~/pages/EditOrder';
import EditProduct from '~/pages/EditProduct';
import EditUser from '~/pages/EditUser';
import Home from '~/pages/Home';
import NewProduct from '~/pages/NewProduct';
import NewUser from '~/pages/NewUser';
import Orders from '~/pages/Orders';
import Products from '~/pages/Products';
import Users from '~/pages/Users';
import Login from '~/pages/Login';

const publicRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/products',
        component: Products,
    },
    {
        path: '/products/edit/:productId',
        component: EditProduct,
    },
    {
        path: '/products/new',
        component: NewProduct,
    },
    {
        path: '/users',
        component: Users,
    },
    {
        path: '/users/edit/:userId',
        component: EditUser,
    },
    {
        path: '/users/new',
        component: NewUser,
    },
    {
        path: '/orders',
        component: Orders,
    },
    {
        path: '/orders/edit/:orderId',
        component: EditOrder,
    },
    {
        path: '/login',
        component: Login,
        layout: null,
    },
];

const privateRoutes = [];

export { privateRoutes, publicRoutes };

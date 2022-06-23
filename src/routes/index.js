import EditProduct from '~/pages/EditProduct';
import EditUser from '~/pages/EditUser';
import Home from '~/pages/Home';
import NewProduct from '~/pages/NewProduct';
import NewUser from '~/pages/NewUser';
import Products from '~/pages/Products';
import Users from '~/pages/Users';

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
        path: '/products/edit:id',
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
        path: '/users/edit:id',
        component: EditUser,
    },
    {
        path: '/users/new',
        component: NewUser,
    },
];

const privateRoutes = [];

export { privateRoutes, publicRoutes };

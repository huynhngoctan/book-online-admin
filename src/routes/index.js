import Home from '~/pages/Home';
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
        path: '/users',
        component: Users,
        layout: null,
    },
];

const privateRoutes = [];

export { privateRoutes, publicRoutes };

import auth from './Modules/Auth';
import asset from './Modules/Asset';
import cart from './Modules/Cart';
import category from './Modules/Category';
import mail from './Modules/Mail';
import order from './Modules/Order';
import product from './Modules/Product';
import user from './Modules/User';


export const routes = [
    {
        path: '/auth',
        router: auth
    },
    {
        path: '/asset',
        router: asset
    },
    {
        path: '/cart',
        router: cart
    },
    {
        path: '/category',
        router: category
    },
    {
        path: '/mail',
        router: mail
    },
    {
        path: '/order',
        router: order
    },
    {
        path: '/product',
        router: product
    },
    {
        path: '/user',
        router: user
    }
];
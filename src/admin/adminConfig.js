import { authRoles } from '../auth';
import { lazy } from 'react';

export const AdminConfig = {
    auth: authRoles.cashier,
    routes: [
        {
            path: '/adminpanel',
            component: lazy(() => import('./admin'))
        }
    ]
};
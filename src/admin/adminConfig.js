import { authRoles } from 'auth';
import { lazy } from 'react';

export const AdminConfig = {
    auth: authRoles.admin,
    routes: [
        {
            path: '/adminpanel',
            component: lazy(() => import('./admin'))
        }
    ]
};
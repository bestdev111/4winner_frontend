import { authRoles } from '../auth';
import { lazy } from 'react';

export const AdminConfig = {
    auth: authRoles.adminPM,
    routes: [
        {
            path: '/adminpanel',
            component: lazy(() => import('./admin'))
        }
    ]
};
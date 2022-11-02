import { authRoles } from 'auth';
import { lazy } from 'react';

export const MLoginConfig = {
    auth: authRoles.admin,
    routes: [
        {
            path: '/m_login',
            component: lazy(() => import('./mLogin'))
        }
    ]
};

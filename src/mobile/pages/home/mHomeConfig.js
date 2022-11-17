import { authRoles } from '../../../auth';
import { lazy } from 'react';

export const MHomeConfig = {
    // auth: authRoles.admin,
    routes: [
        {
            path: '/m_home',
            component: lazy(() => import('./mHome')) 
        }
    ]
};

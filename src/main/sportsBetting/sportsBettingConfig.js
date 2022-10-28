import {lazy} from 'react'
import { authRoles } from 'auth';

export const SportsBettingConfig = {
    auth: authRoles.admin,
    routes: [
        {
            path: '/sportsbetting',
            component: lazy(() => import('./sportsBetting')),
        }
    ]
};

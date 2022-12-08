import { lazy } from 'react';

export const MLoginConfig = {
    routes: [
        {
            path: '/m_login',
            component: lazy(() => import('./mLogin'))
        },
        {
            path: '/m_changepassword',
            component: lazy(() => import('./mChangePassword'))
        },
    ]
};

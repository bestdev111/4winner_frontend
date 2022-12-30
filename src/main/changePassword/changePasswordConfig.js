import { lazy } from 'react'

export const ChangePasswordConfig = {
    routes: [
        {
            path: '/changepass',
            component: lazy(() => import('./changePassword')),
        },
        {
            path: '/myaccount',
            component: lazy(() => import('./myAccount')),
        }
    ]
};

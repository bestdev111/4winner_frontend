import { authRoles } from 'auth';
import { SystemLoadable } from 'utils';

export const SportsBettingConfig = {
    auth: authRoles.admin,
    routes: [
        {
            path: '/sportsbetting',
            component: SystemLoadable({
                loader: () => import('./sportsBetting')
            })
        }
    ]
};

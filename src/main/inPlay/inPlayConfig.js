import { SystemLoadable } from 'utils';

export const InPlayConfig = {
    routes  : [
        {
            path: '/inplay',
            component: SystemLoadable({
                loader: () => import('./inPlay')
            })
        }
    ]
};

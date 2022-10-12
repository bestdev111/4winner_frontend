import { SystemLoadable } from '../../utils';

export const ErrorsConfig = {
    routes  : [
        {
            path     : '/error404',
            component: SystemLoadable({
                loader: () => import('./error404')
            })
        },
        {
            path     : '/error500',
            component: SystemLoadable({
                loader: () => import('./error500')
            })
        }
    ]
};

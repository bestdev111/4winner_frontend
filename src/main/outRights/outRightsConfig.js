import { SystemLoadable } from '../../utils';

export const OutRightsConfig = {
    routes  : [
        {
            path: '/outrights',
            component: SystemLoadable({
                loader: () => import('./outRights')
            })
        }
    ]
};

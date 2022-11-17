import React from 'react';
import { Redirect } from 'react-router-dom';
import { Utils } from '../utils';
import { useMediaQuery } from 'usehooks-ts'
import { authRoles } from '../auth';
//admin
import { AdminConfig } from '../admin/adminConfig'
//desktop view
import { SportsBettingConfig } from '../main/sportsBetting/sportsBettingConfig'
import { InPlayConfig } from '../main/inPlay/inPlayConfig'
import { OutRightsConfig } from '../main/outRights/outRightsConfig'
import { ResultsConfig } from '../main/results/resultsConfig'
// mobile view
import { MHomeConfig } from '../mobile/pages/home/mHomeConfig'
import { MLoginConfig } from '../mobile/pages/login/mLoginConfig'

import Error404 from '../main/errors/error404'
const routeConfigs = [
    AdminConfig,
    SportsBettingConfig,
    InPlayConfig,
    OutRightsConfig,
    ResultsConfig,

    MLoginConfig,
    MHomeConfig,
];
//mobile case
const m_routeConfigs = [
    AdminConfig,
    MLoginConfig,
    MHomeConfig,
]
function customRoutes() {
    const isMobile = useMediaQuery('(max-width: 640px)');
    
    return ([
        ...Utils.generateRoutesFromConfigs(isMobile ? m_routeConfigs : routeConfigs),
        {
            path: '/',
            exact: true,
            component: () => isMobile ? <Redirect to="/m_home" /> : <Redirect to="/sportsbetting" />
        },
        {
            component: Error404
        },
    ])
}

export default customRoutes;

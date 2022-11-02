import React from 'react';
import { Redirect } from 'react-router-dom';
import { Utils } from 'utils';
import { useMediaQuery } from 'usehooks-ts'
//desktop view
import { SportsBettingConfig } from 'main/sportsBetting/sportsBettingConfig'
import { InPlayConfig } from 'main/inPlay/inPlayConfig'
import { OutRightsConfig } from 'main/outRights/outRightsConfig'
import { ResultsConfig } from 'main/results/resultsConfig'
import { ErrorsConfig } from 'main/errors/errorsConfig'
// mobile view
import { MHomeConfig } from 'mobile/pages/home/mHomeConfig'
import { MLoginConfig } from 'mobile/pages/login/mLoginConfig'

const routeConfigs = [
    SportsBettingConfig,
    InPlayConfig,
    OutRightsConfig,
    ResultsConfig,
    ErrorsConfig,
];
//mobile case
const m_routeConfigs = [
    MLoginConfig,
    MHomeConfig,
]
function customRoutes() {
    const isMobile = useMediaQuery('(min-width: 640px)')
    return ([
        ...Utils.generateRoutesFromConfigs(isMobile ? routeConfigs : m_routeConfigs),
        {
            path: '/',
            component: () => isMobile ? <Redirect to="/sportsbetting" /> : <Redirect to="/m_home" />

        },
        {
            component: () => <Redirect to="/error404" />
        },
        {
            component: () => <Redirect to="/error500" />
        }
    ])
}

export default customRoutes;

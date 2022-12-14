import React from 'react';
import { Redirect } from 'react-router-dom';
import { Utils } from '../utils';
import { useMediaQuery } from 'usehooks-ts'
//desktop view
import { SportsBettingConfig } from '../main/sportsBetting/sportsBettingConfig'
import { InPlayConfig } from '../main/inPlay/inPlayConfig'
import { OutRightsConfig } from '../main/outRights/outRightsConfig'
import { ResultsConfig } from '../main/results/resultsConfig'
// mobile view
import { MHomeConfig } from '../mobile/pages/home/mHomeConfig'
import { MLiveConfig } from '../mobile/pages/live/mLiveConfig'
import { MyBetsConfig } from '../mobile/pages/myBets/myBetsConfig'
import { MLoginConfig } from '../mobile/pages/login/mLoginConfig'

import Error404 from '../main/errors/error404'
//desktop view
const routeConfigs = [
    SportsBettingConfig,
    InPlayConfig,
    OutRightsConfig,
    ResultsConfig,
];
//mobile case
const m_routeConfigs = [
    MLoginConfig,
    MHomeConfig,
    MLiveConfig,
    MyBetsConfig
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

import React, { useState } from 'react';
import { SubMobileNavbar, MobileFooter, LeagueContent } from 'mobile/components'
import './mHome.css'
const tipTypesList = [
    [1, 'X', 2],
    [1, 'X', 2],
    ['Over', 'Under'],
    [1, 'X', 2],
    [1, 'X', 2],
    ['1X', 12, 'X2'],
    ['Yes', 'No'],
]
const leagueContentData = [
    {
        title: 'Football/Argentina/Torneo Regional Federal',
        leagues: [
            {
                teamName1: 'La Emilia',
                teamName2: 'Regatas San Nicol.',
                score1: 1,
                score2: 2,
                status: 3,
                redCard1: 0,
                redCard2: 2,
                odd1: '1.50',
                odd2: '0.60',
                odd3: '1.90',
            },
            {
                teamName1: 'Paris SG',
                teamName2: 'Arsenal F.C.',
                score1: 0,
                score2: 0,
                status: 2,
                redCard1: 0,
                redCard2: 0,
                odd1: '3.20',
                odd2: '1.30',
                odd3: '3.20',
            },
        ]
    },
    {
        title: 'Football/Mexico/Liga Expansion MX Apertura',
        leagues: [
            {
                teamName1: 'FC Barcelona',
                teamName2: 'Real Madrid',
                score1: 0,
                score2: 0,
                status: 0,
                redCard1: 0,
                redCard2: 0,
                odd1: '2.30',
                odd2: '2.60',
                odd3: '1.20',
            },
            {
                teamName1: 'Cimarrones Sonora',
                teamName2: 'Club Celaya FC',
                score1: 0,
                score2: 0,
                status: 1,
                redCard1: 0,
                redCard2: 0,
                odd1: '2.30',
                odd2: '2.60',
                odd3: '1.40',
            },
            {
                teamName1: 'Cimarrones Sonora',
                teamName2: 'Club Celaya FC',
                score1: 0,
                score2: 0,
                status: 1,
                redCard1: 0,
                redCard2: 0,
                odd1: '2.30',
                odd2: '2.60',
                odd3: '1.40',
            },
            {
                teamName1: 'Cimarrones Sonora',
                teamName2: 'Club Celaya FC',
                score1: 0,
                score2: 0,
                status: 1,
                redCard1: 0,
                redCard2: 0,
                odd1: '2.30',
                odd2: '2.60',
                odd3: '1.40',
            },
            {
                teamName1: 'Cimarrones Sonora',
                teamName2: 'Club Celaya FC',
                score1: 0,
                score2: 0,
                status: 1,
                redCard1: 0,
                redCard2: 0,
                odd1: '2.30',
                odd2: '2.60',
                odd3: '1.40',
            },
            {
                teamName1: 'Cimarrones Sonora',
                teamName2: 'Club Celaya FC',
                score1: 0,
                score2: 0,
                status: 1,
                redCard1: 0,
                redCard2: 0,
                odd1: '2.30',
                odd2: '2.60',
                odd3: '1.40',
            },
        ]
    }
]
function MHome() {
    const [tipTypes, setTipTypes] = useState();
    const getTipTypes = (data) => { //callback function for children component
        setTipTypes(data);
    }
    return (
        <>
            <SubMobileNavbar parentCallback={getTipTypes} />
            <div className='m_content'>
                <div className='m_header'>
                    <div className='odds'>
                        {tipTypes !== undefined ? tipTypesList[tipTypes].map((item, index) => <p key={index}>{item}</p>) : <></>}
                    </div>
                </div>
                <div className='m_body'>
                    {leagueContentData && leagueContentData.map((leaguesData, index)=> 
                        <>
                            <div key={index} className="league-content">{leaguesData.title}</div>
                            {leaguesData.leagues.map((leagues, i)=> 
                                <LeagueContent
                                    key={i}
                                    teamName1={leagues.teamName1}
                                    teamName2={leagues.teamName2}
                                    score1={leagues.score1}
                                    score2={leagues.score2}
                                    status={leagues.status}
                                    redCard1={leagues.redCard1}
                                    redCard2={leagues.redCard2}
                                    odd1={leagues.odd1}
                                    odd2={leagues.odd2}
                                    odd3={leagues.odd3}
                                />
                            )}
                        </>    
                    )}
                </div>
            </div>
            <MobileFooter />
        </>
    );
};
export default MHome;
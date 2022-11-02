import React from 'react';
import './results.css'
import { RightPanel } from 'components';
const sportslist = [
    { sportsname: 'Football', value: 1 },
    { sportsname: 'Basketball', value: 2 },
    { sportsname: 'Baseball', value: 3 },
    { sportsname: 'IceHockey', value: 4 },
    { sportsname: 'Tennis', value: 5 },
    { sportsname: 'Handball', value: 6 },
    { sportsname: 'Boxing', value: 10 },
    { sportsname: 'American Football', value: 16 },
    { sportsname: 'Rugby', value: 12 },
    { sportsname: 'Snooker', value: 19 },
    { sportsname: 'Darts', value: 22 },
    { sportsname: 'Volleyball', value: 23 },
    { sportsname: 'Futsal', value: 29 },
]
const date_list = [
    { date: '', value: '' }
]
const leagues = [
    {
        title: 'AFC Cup - International Clubs',
        matches: [
            {
                date: '2022-10-22 13:30',
                team1: 'Kuala Lumpur FA',
                team2: 'AI Seeb (N)',
                interim: 'interim 0:2',
                final: 'final 0:3',
            },
            {
                date: '2022-10-22 13:30',
                team1: 'Kuala Lumpur FA',
                team2: 'AI Seeb (N)',
                interim: 'interim 0:2',
                final: 'final 2:3',
            },
        ],
    },
    {
        title: 'Primera Division Clausura - Peru',
        matches: [
            {
                date: '2022-10-22 13:30',
                team1: 'CS Cienciano',
                team2: 'FC Carlos Stein',
                interim: 'interim 0:2',
                final: 'final 4:3',
            },
            {
                date: '2022-10-22 13:30',
                team1: 'Kuala Lumpur FA',
                team2: 'AI Seeb (N)',
                interim: 'interim 0:2',
                final: 'final 6:2',
            },
        ],
    },
]
function Results() {

    return (
        <div className='container-fluid d-flex flex-column ptt'>
            <div className='row'>
                <div className='left px-2 float-left'></div>
                <div className='center px-2 float-left'>
                    <div className='match'>
                        <div className='match-header'>
                            <select id="betradarSportTypes" className='sporttype'>
                                {
                                    sportslist.map((item, index) => <option key={index} value={item.value}>{item.sportsname}</option>)
                                }
                            </select>
                            <select id='dates'>
                                {
                                    date_list.map((item, index) => <option value={item.value} key={index}>{item.date}</option>)
                                }
                            </select>
                        </div>
                        <div className='match-content'>
                            {leagues.map((item, index) =>
                                <div className='league-table' key={index}>
                                    <div className='league-title'>{item.title}</div>
                                    {
                                        item.matches.map((match, key) =>
                                            <div className='finished-match-item d-flex justify-content-between' key={key}>
                                                <div>{match.date}</div>
                                                <div>{match.team1}</div>
                                                <div>{match.team2}</div>
                                                <div>{match.interim}</div>
                                                <div>{match.final}</div>
                                            </div>
                                        )
                                    }

                                </div>

                            )}
                        </div>
                    </div>
                </div>
                <div className='right px-2 float-left'>
                    <RightPanel />
                </div>
            </div>
        </div>
    )
};
export default Results;
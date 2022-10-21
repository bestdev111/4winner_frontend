import React from "react";
import OutEvent from './outEvent'
import '../styles/outtable.css'
const Table = (props) => {
    const data = props;
    return (
        <div className="match-group border-top">
            <div className="table-header">
                <div className="table-title">{data.title}</div>
                <div className="table-menu"></div>
                <div className="clearfix"></div>
            </div>
            <div className="table-content">
                <div className="event-list">
                    <OutEvent
                        national='UEFA Champions League 2022/2023 - Top 2'
                        teamname1='Manchester City'
                        teamname2='Paris St. Germain'
                        teamscore1='1.90'
                        teamscore2='3.50'
                        info= {true}
                    />
                    <OutEvent
                        national='UEFA Champions League 2022/2023 - To reach last 16'
                        teamname1='FC Porto'
                        teamname2='Atletico Madrid'
                        teamscore1='1.90'
                        teamscore2='3.50'
                        info={false}
                    />
                    <OutEvent
                        national='UEFA Champions League 2022/2023 - To reach last 16'
                        teamname1='Liverpool FC'
                        teamname2='Ajax Amsterdam'
                        teamscore1='1.90'
                        teamscore2='3.50'
                        info={false}
                    />
                    <OutEvent
                        national='UEFA Champions League 2022/2023 - Top 2'
                        teamname1='Manchester City'
                        teamname2='Paris St. Germain'
                        teamscore1='1.90'
                        teamscore2='3.50'
                        info={false}
                    />
                    <OutEvent
                        national='UEFA Champions League 2022/2023 - To reach last 16'
                        teamname1='FC Porto'
                        teamname2='Atletico Madrid'
                        teamscore1='1.90'
                        teamscore2='3.50'
                        info={false}
                    />
                    <OutEvent
                        national='UEFA Champions League 2022/2023 - To reach last 16'
                        teamname1='Liverpool FC'
                        teamname2='Ajax Amsterdam'
                        teamscore1='1.90'
                        teamscore2='3.50'
                        info={false}
                    />
                    <OutEvent
                        national='UEFA Champions League 2022/2023 - Top 2'
                        teamname1='Manchester City'
                        teamname2='Paris St. Germain'
                        teamscore1='1.90'
                        teamscore2='3.50'
                        info={true}
                    />
                    <OutEvent
                        national='UEFA Champions League 2022/2023 - To reach last 16'
                        teamname1='FC Porto'
                        teamname2='Atletico Madrid'
                        teamscore1='1.90'
                        teamscore2='3.50'
                        info={false}
                    />
                    <OutEvent
                        national='UEFA Champions League 2022/2023 - To reach last 16'
                        teamname1='Liverpool FC'
                        teamname2='Ajax Amsterdam'
                        teamscore1='1.90'
                        teamscore2='3.50'
                        info={false}
                    />
                    <OutEvent
                        national='UEFA Champions League 2022/2023 - Top 2'
                        teamname1='Manchester City'
                        teamname2='Paris St. Germain'
                        teamscore1='1.90'
                        teamscore2='3.50'
                        info={false}
                    />
                    <OutEvent
                        national='UEFA Champions League 2022/2023 - To reach last 16'
                        teamname1='FC Porto'
                        teamname2='Atletico Madrid'
                        teamscore1='1.90'
                        teamscore2='3.50'
                        info={false}
                    />
                    <OutEvent
                        national='UEFA Champions League 2022/2023 - To reach last 16'
                        teamname1='Liverpool FC'
                        teamname2='Ajax Amsterdam'
                        teamscore1='1.90'
                        teamscore2='3.50'
                        info={false}
                    />
                </div>
                <div className="clearfix"></div>
            </div>
        </div>
    );
}
export default Table;
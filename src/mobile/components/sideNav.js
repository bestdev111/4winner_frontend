import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

function SideNav(props) {
    const ref = useRef(null);
    const { onClickOutside } = props;
    const sports_team_list = useSelector(({ teamList }) => teamList.teamList.sportsTeamList);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                onClickOutside && onClickOutside();
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [onClickOutside, props.show]);

    if (!props.show)
        return null;
    return (
        <div id="mySidenav" className={!props.show ? 'sidenav' : 'sidenav openside'} ref={ref}>
            <div className='p-4'>
                <div className='login p-2'>Login</div>
            </div>
            <div className='p-2 pl-4 pan'>
                <h4>Bets</h4>
            </div>
            <p>Outrights</p>
            <p>Highrights</p>
            {sports_team_list.map((item, index) => <p key={index}>{item.type}</p>)}
            <p>Results</p>
        </div>
    );
}
export default SideNav
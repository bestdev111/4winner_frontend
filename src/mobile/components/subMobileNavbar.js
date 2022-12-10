import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTopLeague, getTypeList } from '../../store/actions/mobileSportsActions'
import './styles/mobileNavbar.css'

const tip_types = ['RM', 'Winner', 'O/U', 'HC', 'NG', 'DC', 'BS'];
function MobileNavbar(props) {
    const [sportActive, setSportActive] = useState(1);
    const [leagueActive, setLeagueActive] = useState(0);
    const [selected, setSelected] = useState(0);
    const SportTypeList = useSelector(state => state.mobileSportsReducers.getTypeList);
    const get_AllMatches = useSelector(state => state.mobileSportsReducers.getAllMatches);
    const leagues_list = useSelector(state => state.mobileSportsReducers.getTopLeague);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTopLeague());
        dispatch(getTypeList());
    }, [dispatch]);

    const sportActiveFunc = (index) => {
        setSportActive(index);
    }
    const leagueActiveFunc = (index) => {
        setLeagueActive(index);
    }
    const tipTypes = (index) => {
        setSelected(index);
    }
    props.parentCallback(selected);
    let availableSportTypes ='';
    if (get_AllMatches.data) {availableSportTypes = get_AllMatches.data.availableSportTypes}
    return (
        <div className="m-subnavbar">
            <div className='d-flex'>
                {availableSportTypes && availableSportTypes.map((availableSportType, index) =>
                    <div className={availableSportType === sportActive ? 'item item-active' : 'item'} key={index} onClick={() => sportActiveFunc(availableSportType)}>
                        <img src={SportTypeList[availableSportType-1] ? SportTypeList[availableSportType-1].m_icon : ''} alt='' />
                        <p>{SportTypeList[availableSportType - 1]? SportTypeList[availableSportType - 1].name : ''}</p>
                    </div>
                )}
            </div>
            {sportActive === 1 ?
                <>
                    <div className='d-flex'>
                        {leagues_list.length !== 0 ? leagues_list.data.result.map((item, index) =>
                            <div
                                className={leagueActive === index ? 'leagues league-active ml-2 mr-2' : 'leagues ml-2 mr-2'}
                                key={index}
                                onClick={() => leagueActiveFunc(index)}
                            >
                                {item.imageName ? <img src={'assets/images/micons/' + item.imageName + '.png'} alt={item.leagueName} /> : <></>}
                                <p className={!item.imageName ? 'font' : ''}>{item.displayName}</p>
                            </div>
                        ): <></>}
                    </div>
                    <div className='tip-types '>
                        <div className='d-flex'>
                            {tip_types.map((item, i) => <div className='tip-type px-1' key={i}><p onClick={() => tipTypes(i)} className={selected === i ? 'selected' : ''}>{item}</p></div>)}
                        </div>
                    </div>
                </>
                : <></>
            }
        </div>
    );
}
export default MobileNavbar

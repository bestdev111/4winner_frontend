import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './styles/mobileNavbar.css'

function SportsTypeNavbar(props) {
    const [sportActiveVal, setSportActiveVal] = useState(1);
    const SportTypeList = useSelector(state => state.mobileSportsReducers.getTypeList);
    const get_AllMatches = useSelector(state => state.mobileSportsReducers.getAllMatches);
    const sportActiveChange = (index, typeName) => {
        setSportActiveVal(index);
        if (index) props.sportActiveFunc(index, typeName);
    }
    let availableSportTypes = '';
    if (get_AllMatches.data) { availableSportTypes = get_AllMatches.data.availableSportTypes }
    return (
        <div className='d-flex sports-type'>
            {availableSportTypes && availableSportTypes.map((availableSportType, index) =>
                <div 
                    className={availableSportType === sportActiveVal ? 'item item-active' : 'item'} 
                    key={index} 
                    onClick={() => sportActiveChange(availableSportType, SportTypeList[availableSportType - 1].name)}
                >
                    <img src={SportTypeList[availableSportType - 1] ? SportTypeList[availableSportType - 1].m_icon : ''} alt='' />
                    <p>{SportTypeList[availableSportType - 1] ? SportTypeList[availableSportType - 1].name : ''}</p>
                </div>
            )}
        </div>
    );
}
export default SportsTypeNavbar;
import React, { useState } from 'react';
import { SubMobileNavbar, MobileFooter } from 'mobile/components'
import './mHome.css'
const according = [
    [1, 'X', 2],
    [1, 'X', 2],
    ['Over', 'Under'],
    [1, 'X', 2],
    [1, 'X', 2],
    ['1X', 12, 'X2'],
    ['Yes', 'No'],
]
function MHome() {
    const [tipTypes, setTipTypes ] = useState();
    const getTipTypes = (data) => { //callback function for children component
        setTipTypes(data);
    }
    return (
        <>
            <SubMobileNavbar parentCallback={getTipTypes}/>
            <div className='d-flex justify-content-center m_content'>
                <div className='m_header'>
                    <div className='odds'>
                        {tipTypes !== undefined ? according[tipTypes].map((item, index) => <p key={index}>{item}</p>) : <></>}
                    </div>
                </div>
            </div>
            <MobileFooter />
        </>
    );
};
export default MHome;
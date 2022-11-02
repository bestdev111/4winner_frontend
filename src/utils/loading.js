import React from 'react';
import { useMediaQuery } from 'usehooks-ts'
import './load.css'
const Loading = (props) => {
    const isMobile = useMediaQuery('(min-width: 640px)')
    return (
        isMobile ?
        <div className='load_style'>
            <div className='load_content'>
                <i className="fa fa-refresh fa-spin fa-5x fa-fw"></i>
            </div>
        </div>
        :
        <div className='m_load_style'>
            <div className='m_load_content'>
                {/* <i className="fa fa-spinner fa-spin fa-4x" aria-hidden="true"></i> */}
                <img src='assets/images/micons/load.gif'alt=''/>
            </div>
        </div>
    )
};

export default Loading;

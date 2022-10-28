import React from 'react';
import './load.css'
const Loading = (props) => {
    return (
        <div className='load_style'>
            <div className='load_content'>
                <i className="fa fa-spinner" aria-hidden="true"></i>
            </div>
        </div>
    )
};

export default Loading;

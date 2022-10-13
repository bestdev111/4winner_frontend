import React from 'react';

const Loading = (props) => {
    if ( props.error )
    {
        return (
            <div className="flex flex-1 flex-col items-center justify-center">
                    Something went wrong
                <button onClick={props.retry} variant="contained" color="secondary">Retry</button>
            </div>
        )
    }
    else if ( props.timedOut )
    {
        return (
            <div className="flex flex-1 flex-col items-center justify-center">
                    Taking a long time...
                <button onClick={props.retry} variant="contained" color="secondary">Retry</button>
            </div>
        )
    }
    else if ( props.pastDelay )
    {
        return (
            <div id="block-page" class="block-page" style="display: none;">Loading...</div>
        );
    }
    else
    {
        return null;
    }
};

export default Loading;

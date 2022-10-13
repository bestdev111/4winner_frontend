import React from "react";

const Divider =(props)=> {
    const data = props;
    console.log('title', data.title);
    return (
        <div className="divider">
            <span>{data.title}</span>
        </div>
    );
}
export default Divider;
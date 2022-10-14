import React from "react";

const Divider =(props)=> {
    const data = props;
    return (
        <div className="divider">
            <span>{data.title}</span>
        </div>
    );
}
export default Divider;
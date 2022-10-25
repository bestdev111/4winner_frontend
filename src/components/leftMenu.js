import React, { useState } from 'react';
import TreeView from 'react-treeview';
import { SportsTeamList } from 'utils'
import './styles/leftMenu.css'

function LeftMenu(props) {
    
    const [isCollapse1, setIsCollapse1] = useState([]);
    const [isCollapse2, setIsCollapse2] = useState([]);
    
    const collapseFunc1 = (index) => {
        if(isCollapse1[index] == undefined) {
            isCollapse1[index] = true;
        }
        let newArr = [...isCollapse1];
        for (let index = 0; index < newArr.length; index++) {
            newArr[index] = true;
        }
        newArr[index] = !isCollapse1[index];
        setIsCollapse1(newArr);
    }
    const collapseFunc2 = (index) => {
        if (isCollapse2[index] == undefined) {
            isCollapse2[index] = true;
        }
        let newArr = [...isCollapse2];
        for (let index = 0; index < newArr.length; index++) {
            newArr[index] = true;
        }
        newArr[index] = !isCollapse2[index];
        setIsCollapse2(newArr);
    }
    return (
        <div>
            <div className='menu-header'>
                Sports Betting
            </div>
            <div className='menu-content bordered-top'>
                <div className='menu_main'>
                    {SportsTeamList && SportsTeamList.map((first, index) => {
                        const label = <span className="node" key={index} onClick={()=>collapseFunc1(index)}><img className='sport-icon' src={first.icon} />{first.type}</span>;
                        return (
                            <TreeView key={first.type}
                                nodeLabel={label}
                                defaultCollapsed={true}
                                collapsed={isCollapse1[index]}
                                onClick={() => collapseFunc1(index)}
                            >
                                {first.child && first.child.map((secondChild, i) => {
                                    const label2 = <span className="node_second" onClick={() => collapseFunc2(i)}>{secondChild.type}</span>;
                                    return (
                                        <TreeView
                                            nodeLabel={label2}
                                            key={secondChild.type}
                                            defaultCollapsed={true}
                                            collapsed={isCollapse2[i]}
                                            onClick={() => collapseFunc2(i)}
                                        >
                                            {secondChild.child && secondChild.child.map((lastChild, key) => (<div key={key}><span className="node_third">{lastChild.type}</span></div>))}
                                        </TreeView>
                                    );
                                })}
                            </TreeView>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default LeftMenu;
import React, { useState } from 'react';
import TreeView from 'react-treeview';
import { SportsTeamList } from 'utils'
import './styles/leftMenu.css'

function LeftMenu(props) {
    const [isCollapse, setIsCollapse] = useState(true);
    const collapseFunc = () => {
        console.log('please collapse');
    }
    return (
        <div>
            <div className='menu-header'>
                Sports Betting
            </div>
            <div className='menu-content bordered-top'>
                <div className='menu_main'>
                    {SportsTeamList.map((first, index) => {
                        const label = <span className="node" onClick={collapseFunc}><img className='sport-icon' src={first.icon} />{first.type}</span>;
                        return (
                            <TreeView key={first.type}
                                nodeLabel={label}
                                defaultCollapsed={isCollapse}
                            >
                                {first.child.map((secondChild, j) => {
                                    const label2 = <span className="node_second">{secondChild.type}</span>;
                                    return (
                                        <TreeView
                                            nodeLabel={label2}
                                            key={secondChild.type}
                                            defaultCollapsed={isCollapse}
                                            onClick={collapseFunc}
                                        >
                                            {/* {secondChild.child.map(lastChild => {
                                        const label3 = <span className="node_third">{lastChild.type}</span>;
                                        return (
                                            <TreeView
                                                nodeLabel={label3}
                                                key={lastChild.type}
                                            // defaultCollapsed={isCollapse}
                                            // onClick={collapseFunc}
                                            >
                                            </TreeView>
                                        );
                                    })} */}
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
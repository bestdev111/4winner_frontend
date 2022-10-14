import React, { useState } from 'react';
import TreeView from 'react-treeview';
import { SportsTeamList } from 'utils'

function Company() {
    const [isCollapse, setIsCollapse] = useState(true);
    const collapseFunc = () => {
        isCollapse ? document.getElementsByClassName('menu-content')[0].className.replace('menu-content bordered-top scroll') : document.getElementsByClassName('menu-content')[0].className.replace('menu-content bordered-top')
        console.log('please collapse');
    }
    return (
        <div className='menu_main'>
            {SportsTeamList.map((first, index) => {
                const label = <span className="node" onClick={collapseFunc}><img className='sport-icon' src={first.icon}/>{first.type}</span>;
                return (
                    <TreeView key={first.type} 
                        nodeLabel={label} 
                        defaultCollapsed={isCollapse}
                    >
                        {first.child.map((secondChild, j) => {
                            const label2 = <span className="node">{secondChild.type}</span>;
                            return (
                                <TreeView
                                    nodeLabel={label2}
                                    key={secondChild.type}
                                    defaultCollapsed={isCollapse}
                                    onClick={collapseFunc}
                                >
                                    {/* {secondChild.child.map(lastChild => <div className="info">{lastChild.type}</div>)} */}
                                </TreeView>
                            );
                        })}
                    </TreeView>
                );
            })}
        </div>
    );
}

export default Company;
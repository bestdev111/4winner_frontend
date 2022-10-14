import { Collapse } from 'antd';
import React from 'react';
import TreeView from 'react-treeview';
import { SportsTeamList } from 'utils' 
const dataSource = [
    {
        type: 'Employees',
        collapsed: true,
        people: [
            { name: 'Paul Gordon', age: 29, sex: 'male', role: 'coder', collapsed: false },
            { name: 'Sarah Lee', age: 27, sex: 'female', role: 'ocamler', collapsed: false },
        ],
    },
    {
        type: 'CEO',
        collapsed: true,
        people: [
            { name: 'Drew Anderson', age: 39, sex: 'male', role: 'boss', collapsed: false },
        ],
    },
];
const collapseFunc =(i) => {
    console.log('please collapse', i);
}
function Company () {
        return (
            <div className='menu_main'>
                {dataSource.map((node, i) => {
                    const type = node.type;
                    const label = <span className="node" onClick={(i)=>collapseFunc}>{type}</span>;
                    return (
                        <TreeView key={type + '|' + i} nodeLabel={label} defaultCollapsed={true}>
                            {node.people.map(person => {
                                const label2 = <span className="node">{person.name}</span>;
                                return (
                                    <TreeView 
                                        nodeLabel={label2} 
                                        key={person.name} 
                                        defaultCollapsed={true}
                                        onClick={collapseFunc}
                                    >
                                        <div className="info">age: {person.age}</div>
                                        <div className="info">sex: {person.sex}</div>
                                        <div className="info">role: {person.role}</div>
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
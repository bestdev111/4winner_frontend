import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import TreeView from 'react-treeview';
import { getTypeList, getAllMatches } from 'store/actions/sportsActions'
import './styles/leftMenu.css'

function LeftMenu(props) {
    const SportTypeList = useSelector(state => state.sportsReducers.getTypeList);
    const get_AllMatches = useSelector(state => state.sportsReducers.getAllMatches);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTypeList());
        dispatch(getAllMatches());
    }, [dispatch]);
    const [isCollapse1, setIsCollapse1] = useState([]);
    const [isCollapse2, setIsCollapse2] = useState([]);
    const [isCollapse3, setIsCollapse3] = useState(undefined);

    const collapseFunc1 = (index) => {
        if (isCollapse1[index] === undefined) {
            isCollapse1[index] = false;
        }
        let newArr = [...isCollapse1];
        for (let index = 0; index < newArr.length; index++) {
            newArr[index] = false;
        }
        newArr[index] = !isCollapse1[index];
        setIsCollapse1(newArr);
        setIsCollapse3(undefined);
    }
    const collapseFunc2 = (index) => {
        if (isCollapse2[index] === undefined) {
            isCollapse2[index] = false;
        }
        let newArr = [...isCollapse2];
        for (let index = 0; index < newArr.length; index++) {
            newArr[index] = false;
        }
        newArr[index] = !isCollapse2[index];
        setIsCollapse2(newArr);
        setIsCollapse3(undefined);
    }
    let availableSportTypes = '';
    if (get_AllMatches.data){
        availableSportTypes = get_AllMatches.data.availableSportTypes;
    }
    function getLeagueMatchCount(params) {
        let sum = 0;
        get_AllMatches.data.leagues.forEach(element => {
            if (element.betradarSportId === params) {
                sum = sum + element.leagueMatchCount
            }
        });
        return sum;
    }
    return (
        <div>
            <div className='menu-header'>
                Sports Betting
            </div>
            <div className='menu-content bordered-top'>
                <div className='menu_main'>
                    {/* {SportTypeList && SportTypeList.map((first, index) => {
                        const label = <span className="node" key={index} onClick={() => collapseFunc1(index)}><img className='sport-icon' src={first.icon} alt="sport-icon"/>{first.type}</span>;
                        return (
                            <TreeView key={first.type}
                                nodeLabel={label}
                                defaultCollapsed={true}
                                collapsed={isCollapse1[index]}
                                onClick={() => collapseFunc1(index)}
                            >
                                {first.child && first.child.map((secondChild, i) => {
                                    const label2 = <span className="node_second" onClick={() => collapseFunc2(i)} key={i}>{secondChild.type}</span>;
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
                    })} */}
                    {availableSportTypes && availableSportTypes.map((availableSportType, index1) =>
                        availableSportType ?
                        <div key={index1} className="sportstypes">
                                <p className={isCollapse1[index1] ? 'collapsed first-lists' : 'first-lists'} onClick={() => collapseFunc1(index1)}>
                                {/* <span className="">
                                    {getLeagueMatchCount(availableSportType)}
                                </span> */}
                                    <img className='leftmenu-icon' src='assets/images/icons/caret-right-solid.svg'/>
                                    <img className='leftmenu-icon' src={SportTypeList[availableSportType - 1].icon}/>
                                {SportTypeList[availableSportType - 1].name}
                            </p>
                            <ul className={isCollapse1[index1] ? 'show' : 'hide'}>
                                {get_AllMatches.data.leagues && get_AllMatches.data.leagues.map((item, index2) =>
                                    item.betradarSportId === availableSportType ?
                                        <li key={index2}>
                                            <p className={isCollapse2[index2] ? 'collapsed lists' : 'lists'} onClick={() => collapseFunc2(index2)}>
                                                {item.name}
                                            </p>
                                            <ul className={isCollapse2[index2] ? 'show' : 'hide'}>
                                                {item.leagueList.map((league, index3) =>
                                                    <li key={index3}>
                                                        <p className={isCollapse3 === index3 ? 'collapsed lists' : 'lists'} onClick={() => setIsCollapse3(index3)}>
                                                            {league.name}
                                                        </p>
                                                    </li>
                                                )}
                                            </ul>
                                        </li>
                                        : <></>
                                )}
                            </ul>
                        </div>
                        :<></>
                    )}
                </div>
            </div>
        </div>
    );
}

// export default withReducer('teamList', reducer)(LeftMenu);
export default LeftMenu;
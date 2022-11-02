import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'store/withReducer';
import reducer from 'store/sports';
import { getList } from 'store/sports/teamListSlice'
import TreeView from 'react-treeview';

const lang_list = [
    { id: 0, name: 'de_DE', icon: 'assets/images/flags/de_DE.png', title: 'Deutsch' },
    { id: 1, name: 'en_US', icon: 'assets/images/flags/en_US.png', title: 'English' },
    { id: 2, name: 'nl_NL', icon: 'assets/images/flags/nl_NL.png', title: 'Dutch' },
    { id: 3, name: 'tr_TR', icon: 'assets/images/flags/tr_TR.png', title: 'Türkçe' },
    { id: 4, name: 'fr_FR', icon: 'assets/images/flags/fr_FR.png', title: 'Français' },
    { id: 5, name: 'el_GR', icon: 'assets/images/flags/el_GR.png', title: 'Ελληνικά' },
    { id: 6, name: 'bu_BU', icon: 'assets/images/flags/bu_BU.png', title: 'български' },
]
function SideNav(props) {
    const [langOpen, setLangOpen] = useState(false);
    const [siteLang, setSiteLang] = useState(1);

    const [isCollapse1, setIsCollapse1] = useState([]);
    const [isCollapse2, setIsCollapse2] = useState([]);
    const [isCollapse3, setIsCollapse3] = useState(undefined);
    const { onClickOutside } = props;
    const ref = useRef(null);
    const dispatch = useDispatch();
    const sports_team_list = useSelector(({ teamList }) => teamList.teamList.sportsTeamList);

    useEffect(() => {
        dispatch(getList());
    }, [dispatch]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                onClickOutside && onClickOutside();
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [onClickOutside, props.show]);

    if (!props.show)
        return null;

    const collapseFunc1 = (index) => {
        if (isCollapse1[index] === undefined) {
            isCollapse1[index] = true;
        }
        let newArr = [...isCollapse1];
        for (let index = 0; index < newArr.length; index++) {
            newArr[index] = true;
        }
        newArr[index] = !isCollapse1[index];
        setIsCollapse1(newArr);
        setIsCollapse3(undefined);
    }
    const collapseFunc2 = (index) => {
        if (isCollapse2[index] === undefined) {
            isCollapse2[index] = true;
        }
        let newArr = [...isCollapse2];
        for (let index = 0; index < newArr.length; index++) {
            newArr[index] = true;
        }
        newArr[index] = !isCollapse2[index];
        setIsCollapse2(newArr);
        setIsCollapse3(undefined);
    }
    return (
        <div id="mySidenav" className={!props.show ? 'sidenav' : 'sidenav openside'} ref={ref}>
            <div className='p-3'>
                <div className='login d-flex justify-content-center p-2'><a href='/m_login'>Login</a></div>
            </div>
            <div className='pan'>
                <div>Bets</div>
            </div>
            <div className='sidenav_lists'>
                <p>Outrights</p>
                <p>Highrights</p>

                {sports_team_list && sports_team_list.map((first, index) => {
                    const label = <span className={isCollapse1[index] === undefined || isCollapse1[index] ? 'node' : 'node collapse'} key={index} onClick={() => collapseFunc1(index)}>{first.type}</span>;
                    return (
                        <TreeView key={first.type}
                            nodeLabel={label}
                            defaultCollapsed={true}
                            collapsed={isCollapse1[index]}
                            onClick={() => collapseFunc1(index)}
                        >
                            {first.child && first.child.map((secondChild, i) => {
                                const label2 = <span className={isCollapse2[i] === undefined || isCollapse2[i] ? 'node_second' : 'node_second collapse'} key={i} onClick={() => collapseFunc2(i)}>{secondChild.type}</span>;
                                return (
                                    <TreeView
                                        nodeLabel={label2}
                                        key={secondChild.type}
                                        defaultCollapsed={true}
                                        collapsed={isCollapse2[i]}
                                        onClick={() => collapseFunc2(i)}
                                    >
                                        {secondChild.child && secondChild.child.map((lastChild, key) => (
                                            <div key={key} onClick={() => setIsCollapse3(key)}>
                                                <span
                                                    className={isCollapse3 === undefined || isCollapse3 !== key ? 'node_third' : 'node_third collapse'}
                                                >
                                                    {lastChild.type}
                                                </span>
                                            </div>
                                        ))}
                                    </TreeView>
                                );
                            })}
                        </TreeView>
                    );
                })}

                <p>Results</p>
            </div>
            <div className='pan'>
                <div>Language Selection</div>
            </div>
            <div className='sidenav_lists'>
                <p className='d-flex justify-content-between' onClick={() => setLangOpen(!langOpen)}>
                    <span>
                        <img className='selected_lang' src={lang_list[siteLang].icon} alt='' />
                        {lang_list[siteLang].title}
                    </span>
                    <span className='expand_icon'>{langOpen ? '-' : '+'}</span>
                </p>
                <div className={langOpen ? 'lang_list lang_list_expand' : 'lang_list'}>
                    {lang_list.map((lang, index) =>
                        <div className='d-flex align-items-center' key={index} onClick={() => setSiteLang(index)}>
                            <img src={lang.icon} alt={lang.title} />
                            <p>{lang.title}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default withReducer('teamList', reducer)(SideNav)
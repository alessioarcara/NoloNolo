import Results from "../components/Results/Results";
import BackIcon from "../components/UI/icons/BackIcon";
import classes from './ResultsPage.module.css';
// import ScrollSmooth from "../components/UI/ScrollSmooth/ScrollSmooth";
// import ArrowTopIcon from "../components/UI/icons/ArrowTopIcon";
import {useEffect, useState} from "react";
import { useLocation } from 'react-router-dom';

const ResultsPage = () => {
    const [allParams, setAllParams] = useState(false);
    const [days, setDays] = useState(0);
    const URL = new URLSearchParams(window.location.search);

    const local = useLocation();
    console.log(local)

    const start = URL.get('start')
        ? new Date(URL.get('start'))
        : Object.null;

    const end = URL.get('end')
        ? new Date(URL.get('end'))
        : Object.null;

    const time = (start && end)
        ? new Date(end).getTime() - new Date(start).getTime()
        : Object.null;

    useEffect(() => {
        if (start && end && time) {
            setDays(time / (1000 * 3600 * 24));
            setAllParams(true);
        }
    }, [start, end, time]);

    return (
        <>
            <div className={classes.header}>
                <div className={classes['style-back']}><BackIcon/></div>
            </div>

            <div className={classes['header-title']}>Numero barche restituite</div>

            {/*{allParams &&*/}
            {/*<div className={classes['dates-table']}>*/}
            {/*    <div>{start}</div>*/}
            {/*    <div>{end}</div>*/}
            {/*</div>*/}
            {/*}*/}

            <div className={classes['filters-container']}>
                <button className={classes['btn-filter']} type="button">Tipologia</button>
                <button className={classes['btn-filter']} type="button">Prezzo</button>
                <button className={classes['btn-filter']} type="button">Skipper</button>
                <button className={classes['btn-filter']} type="button">Ospiti</button>
            </div>
            {/*<ScrollSmooth*/}
            {/*    // x={document.getElementById('ccc').offsetTop}*/}
            {/*    className={classes['position-scroll']} btn="true"*/}
            {/*>*/}
            {/*    <ArrowTopIcon/>*/}
            {/*</ScrollSmooth>*/}
            <Results missingDays={days} onParams={allParams}/>
        </>
    );
};

export default ResultsPage;
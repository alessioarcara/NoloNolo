import Results from "../components/Results/Results";
import BackIcon from "../components/UI/icons/BackIcon";
import classes from './ResultsPage.module.css';
import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Results/Navbar";
import Modal from "../components/UI/Modal/Modal";
import TypeFilter from "../components/Results/Filters/TypeFilter";

const ResultsPage = () => {
    // const [isShow, setIsShow] = useState (false)
    // const [allParams, setAllParams] = useState(false);
    // const [days, setDays] = useState(0);
    // const URL = useMemo(() => new URLSearchParams(window.location.search), []);
    //
    // console.log(URL.get('start'))
    //
    // const start = useMemo(() => URL.get('start')
    //     ? new Date(URL.get('start'))
    //     : Object.null, [URL]);
    //
    // const end = useMemo(() => URL.get('end')
    //     ? new Date(URL.get('end'))
    //     : Object.null,[URL]);
    //
    // const time = (start && end)
    //     ? new Date(end).getTime() - new Date(start).getTime()
    //     : Object.null;
    //
    // useEffect(() => {
    //     if (start && end && time) {
    //         setDays(time / (1000 * 3600 * 24));
    //         setAllParams(true);
    //     }
    // }, [start, end, time]);

    return (
        <>
            <Navbar/>
            {/*{allParams &&*/}
            {/*<div className={classes['dates-table']}>*/}
            {/*    <div>{start}</div>*/}
            {/*    <div>{end}</div>*/}
            {/*</div>*/}
            {/*}*/}

            <Results/>
        </>
    );
};

export default ResultsPage;

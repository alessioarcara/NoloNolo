import Results from "../components/Results/Results";
import {useEffect, useState} from "react";
import Header from "../components/Results/Header";
import useHttp from "../hooks/use-http";
import {body_boats} from "../helpers/httpConfig";

const ResultsPage = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const {status, data: boats, sendRequest: fetchResults} = useHttp(true)

    useEffect(() => {
        const transformData = resData => resData.boats
        fetchResults({body: body_boats({where: "marina", skip: currentPage})}, transformData)
    }, [fetchResults, currentPage])

    // const [isShow, setIsShow] = useState (false)
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

    const resultsNumber = boats && boats[0].totalCount

    return (
        <>
            <Header resultsNumber={resultsNumber}/>
            <Results
                boats={boats}
                status={status}
                switchPage={setCurrentPage}
                numberPage={currentPage}
            />
        </>
    );
};

export default ResultsPage;

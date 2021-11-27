import Results from "../components/Results/Results";
import {useEffect, useMemo, useState} from "react";
import Header from "../components/Results/Header";
import useHttp from "../hooks/use-http";
import {body_advertisements} from "../helpers/httpConfig";
import {parseQueryResponse} from "../helpers/Utils/utils";

const ResultsPage = () => {
    const [filters, setFilters] = useState({})
    const [currentPage, setCurrentPage] = useState(0);
    const {status, data: boats, sendRequest: fetchResults} = useHttp(true)

    const URL = useMemo(() =>
        new URLSearchParams(window.location.search), []);
    const boatsNumber = useMemo(() =>
        !boats ? false : boats.length  > 0 ? boats[0].totalCount :"Nessun risultato", [boats])
    const boatsMaxPrice = useMemo(() =>
        boats && boats.length > 0 ? boats[0].maxPrice: 10000, [boats])

    useEffect(() => {
        fetchResults({body: body_advertisements(
            {
                region: URL.get('region'),
                city: URL.get('city'),
                from: URL.get('from'),
                to: URL.get('to'),
                skip: currentPage,
                boatTypes: filters.boatTypes,
                minCapacity: filters.minCapacity,
                minPrice: filters.minPrice,
                maxPrice: filters.maxPrice,
                take: 20}
            )}, parseQueryResponse)
    }, [fetchResults, currentPage, filters, URL])

    return (
        <>
            <Header
                boatsNumber={boatsNumber}
                boatsMaxPrice={boatsMaxPrice}
                onSubmitFilters={setFilters}
            />
            <Results
                boats={boats}
                status={status}
                switchPage={setCurrentPage}
                numberPage={currentPage}
            />
            <div style={{marginBottom:"5rem"}}/>
        </>
    );
};

export default ResultsPage;

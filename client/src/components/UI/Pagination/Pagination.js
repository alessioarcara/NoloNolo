import React, {useCallback, useMemo} from "react";
import classes from "./Pagination.module.css"
import LeftArrowIcon from "../icons/LeftArrowIcon";
import RightArrowIcon from "../icons/RightArrowIcon";

const Pagination = ({dataCount, dataLimit = 10, currentPage, setCurrentPage}) => {
    /* lastPage (1, 2, ..., N) register total page number */
    const lastPage = useMemo(() => Math.floor(dataCount / dataLimit) + 1 , [dataCount, dataLimit])
    /* currPage (e.g. dataLimit = 20 then 0, 1, 2, ..., N - 1) register the first element on a page / data limit on a page */
    const currPage = useMemo(() => Math.floor(currentPage / dataLimit), [currentPage, dataLimit])
    /* pagesGroup to shows the user the page group in the pagination: if last page > 3 then 3 at a time */
    const pagesGroup = useMemo(() => lastPage > 3 ? 3 : lastPage, [lastPage])

    /*
    * function to go next page, to go previous page and to go current page: dataLimit changes the pages
    * if oldPageNumber = 20 and dataLimit is 10, goToNextPage = 30, goToPreviousPage = 10
    */
    const goToNextPage = useCallback(() => setCurrentPage(oldPageNumber => oldPageNumber + dataLimit), [setCurrentPage, dataLimit]);
    const goToPreviousPage = useCallback(() => setCurrentPage(oldPageNumber => oldPageNumber - dataLimit), [setCurrentPage, dataLimit]);
    /*
    * changePage takes the selected number through an event - 1  * dataLimit
    * (e.g. event = 2 and dataLimit = 20 then pageNumber = 20 because the first element in second page is 20 (from 39),
    * in first page is 0 (from 19), in third page is 40 (from 59)...)
    */
    const changePage = useCallback(event => {
        const pageNumber = (+event.target.textContent - 1) * dataLimit;
        setCurrentPage(pageNumber);
    }, [setCurrentPage, dataLimit]);

    /*
    * Array(pagesGroup).fill() performs a number of times equal to pagesGroup
    * lasPage - 1 because lastPage starts by +1
    *   If pagesGroup = 3, idx = 0, 1, 2, dataLimit = 20, dataCount = 173 and lastPage = 9
    *   1° condition: if currPage = 8 and lastPage - 1 = 8 then (7, 8, 9)
    *   2° condition: (1, 2, 3)
    *   3° condition: if currPage = 2 then (2, 3, 4), if currPage = 3 then (3, 4, 5)
    */
    const getPaginationGroup = useCallback(() => {
        const pageNumberList = new Array(pagesGroup).fill().map(
            (_, idx) => {
                return currPage === lastPage - 1 && lastPage - 1 > 1 ? currPage + idx - 1
                     : currPage === 0 ? currPage + idx + 1
                     : currPage + idx
            }
        );

        return lastPage <= pagesGroup ? pageNumberList
            : (currPage < (lastPage) / 2) ? pageNumberList.concat(["...", (lastPage)])
            : [1, "..."].concat(pageNumberList)
    }, [currPage, lastPage, pagesGroup]);

    return (
        <div className={classes.pagination}>
            {/* prev page */}
            <button onClick={goToPreviousPage} className={classes.prev} hidden={currPage === 0}>
                <LeftArrowIcon/>
            </button>
            {/* current page and page number */}
            {getPaginationGroup().map((item, index) => typeof (item) !== "number" ?
                <span key={index}>{item}</span>
                : <button
                    key={index}
                    onClick={changePage}
                    className={`
                        ${classes.paginationItem}
                        ${currPage === item - 1 && (classes.active)}
                        `}>
                    <span>{item}</span>
                </button>
            )}
            {/* next page */}
            <button onClick={goToNextPage} className={classes.next} hidden={currPage === lastPage - 1}>
                <RightArrowIcon/>
            </button>
        </div>
    );
}

export default Pagination;

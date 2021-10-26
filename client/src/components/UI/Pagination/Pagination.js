import React, {useCallback, useMemo} from "react";
import classes from "./Pagination.module.css"
import LeftArrowIcon from "../icons/LeftArrowIcon";
import RightArrowIcon from "../icons/RightArrowIcon";

const Pagination = ({dataCount, dataLimit = 10, currentPage, setCurrentPage}) => {
    /* register total page number */
    const lastPage = useMemo(() => Math.floor(dataCount / dataLimit) + 1 , [dataCount, dataLimit])
    const currPage = useMemo(() => Math.floor(currentPage / dataLimit), [currentPage, dataLimit])
    const pagesGroup = useMemo(() => lastPage > 3 ? 3 : lastPage, [lastPage])

    /* function to go next page, to go previous page and to go current page */
    const goToNextPage = useCallback(() => setCurrentPage(oldPageNumber => oldPageNumber + dataLimit), [setCurrentPage]);
    const goToPreviousPage = useCallback(() => setCurrentPage(oldPageNumber => oldPageNumber - dataLimit), [setCurrentPage]);
    const changePage = useCallback(event => {
        const pageNumber = (+event.target.textContent - 1) * 10;
        setCurrentPage(pageNumber);
    }, [setCurrentPage]);

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

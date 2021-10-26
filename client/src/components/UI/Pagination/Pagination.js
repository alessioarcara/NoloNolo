import React, {useCallback} from "react";
import classes from "./Pagination.module.css"
import LeftArrowIcon from "../icons/LeftArrowIcon";
import RightArrowIcon from "../icons/RightArrowIcon";

const Pagination = ({dataCount, dataLimit= 10, currentPage, setCurrentPage}) => {
    /* register total page number */
    const pages = Math.floor(dataCount / dataLimit)
    const pagesGroup = pages > 3 ? 3 : pages

    /* function to go next page, to go previous page and to go current page */
    const goToNextPage = () => setCurrentPage(oldPageNumber => oldPageNumber + 10);
    const goToPreviousPage = () => setCurrentPage(oldPageNumber => oldPageNumber - 10);

    const changePage = event => {
        const pageNumber = (Number(event.target.textContent) - 1) * 10;
        setCurrentPage(pageNumber);
    }

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
            <button onClick={goToPreviousPage} className={classes.prev} hidden={currentPage === 0}>
                <LeftArrowIcon/>
            </button>
            {/* current page and page number */}
            {getPaginationGroup().map((item, index) => (
                <button
                    key={index}
                    onClick={changePage}
                    className={
                        `${classes.paginationItem}
                        ${currentPage/10 === item - 1 && (classes.active)}
                        ${item > pages+1 && classes.deactivate}`}
                >
                    <span>{item}</span>
                </button>
            ))}
            <button onClick={goToNextPage} className={classes.next} hidden={(currentPage/10) === pages}>
                <RightArrowIcon/>
            </button>
        </div>
    );
}

export default Pagination;

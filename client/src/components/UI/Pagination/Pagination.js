import React, {useCallback, useState} from "react";
import classes from "./Pagination.module.css"
import LeftArrowIcon from "../icons/LeftArrowIcon";
import RightArrowIcon from "../icons/RightArrowIcon";

const Pagination = ({dataCount, dataLimit= 10, currentPage, setCurrentPage}) => {
    /* register total page number */
    const pages = Math.floor(dataCount / dataLimit)
    const pagesGroup = pages > 5 ? 5 : pages

    /* function to go next page, to go previous page and to go current page */
    const goToNextPage = () => setCurrentPage(oldPageNumber => oldPageNumber + 10);
    const goToPreviousPage = () => setCurrentPage(oldPageNumber => oldPageNumber - 10);

    const changePage = event => {
        const pageNumber = (Number(event.target.textContent) - 1) * 10;
        setCurrentPage(pageNumber);
    }

    /* Array of new pages: return the next three number */
    const getPaginationGroup = useCallback(() => {
        const start = Math.floor(((currentPage/10)) / pagesGroup) * pagesGroup;
        return new Array(pagesGroup).fill().map((_, idx) => start + idx + 1);
    }, []);

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
                    className={`${classes.paginationItem}
                    ${currentPage/10 === item - 1
                        ? (classes.active)
                        : (item > pages ?  classes.deactivate : '')}`}
                >
                    <span>{item}</span>
                </button>
            ))}
            {<span>...</span>}
            <button
                className={`${classes.paginationItem}`}
                onClick={changePage}
            >
                <span>{pages+1}</span>
            </button>
            {/* next page */}
            <button onClick={goToNextPage} className={classes.next} hidden={(currentPage/10) === pages}>
                <RightArrowIcon/>
            </button>
        </div>
    );
}

export default Pagination;

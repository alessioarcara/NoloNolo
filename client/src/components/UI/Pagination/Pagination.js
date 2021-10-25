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
        const start = Math.floor(currentPage/10)
        let pageNumberList = Array(pagesGroup).fill().map((_, idx) => start + idx + 1);

        if (start < (pages+1)/2) {
            return pageNumberList.concat(["...", (pages + 1)])
        }
        return [1, "..."].concat(pageNumberList)
        }, [currentPage, pages, pagesGroup]);

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

import React, {useState} from "react";
import classes from "./Pagination.module.css"

const Pagination = ({data, pageLimit, dataLimit}) => {
    // const [pages] = useState(Math.round(data.length / dataLimit));
    const [currentPage, setCurrentPage] = useState(1);

    const goToNextPage = () => setCurrentPage(page => page + 1);
    const goToPreviousPage = () => setCurrentPage(page => page - 1);

    const changePage = event => {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
    }

    // const getPaginatedData = () => {
    //     const startIndex = currentPage * dataLimit - dataLimit;
    //     const endIndex = startIndex + dataLimit;
    //     return data.slice(startIndex, endIndex);
    // };

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
    };

    return (
        <div className={classes.pagination}>
            {/* prev */}
            <button onClick={goToPreviousPage} className={classes.prev}>
                prev
            </button>
            {/* page numbers */}
            {getPaginationGroup().map((item, index) => (
                <button key={index} onClick={changePage} className={classes.paginationItem}>
                    <span>{item}</span>
                </button>
            ))}
            {/* next */}
            <button onClick={goToNextPage} className={classes.next}>
                next
            </button>
        </div>
    );
}

export default Pagination;

// ${currentPage === item ? classes.active : null}`
// `next ${currentPage === pages ? 'disabled' : ''}`
// `prev ${currentPage === 1 ? 'disabled' : ''}`

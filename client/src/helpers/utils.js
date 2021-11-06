import {useMemo} from "react";

export const throttle = (callback, delay) => {
    let wait = false;
    return () => {
        if (!wait) {
            callback.call();
            wait = true;
            setTimeout(() => {
                wait = false;
            }, delay)
        }
    }
}

export const debounce = (callback, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback.apply(this, args)
        }, delay);
    }
};

export const circularSlice = (arr, start, end) => {
    return end < start ? arr.slice(start).concat(arr.slice(0, end + 1)) : arr.slice(start, end + 1)
}

/* Settiamo lo style come valuta e prendiamo la valuta Euro. de-DE sta per Germania */
export const formatNumber = (number) =>
    new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR'
    }).format(number);

/* Set data from dd/mm/yyyy to yyyy-mm-dd */
export const formatDate = (date) =>
    new Date(date.getTime() - (date.getTimezoneOffset() * 60 * 1000))
        .toISOString().split('T')[0]

export const rangeDate = ((startDate, endDate) => {
    const oneDayMilliseconds = 24 * 60 * 60 * 1000
    return endDate ? Math.round((new Date(endDate) - new Date(startDate)) / oneDayMilliseconds) : 0
})


/* Set averageReviews */
export const averageReviews = (reviews => reviews.reduce((sum, {rating}) => sum + rating, 0) / reviews.length)

/* Set general date with options */
export const formatDayMonthYearDate = (date, options) =>
    new Date(date).toLocaleDateString("it-IT", options)
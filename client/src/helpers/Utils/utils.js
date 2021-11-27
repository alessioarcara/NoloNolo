/* ------------------------------ Callbacks Utils --------------------------------- */
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
};
export const debounce = (callback, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback.apply(this, args)
        }, delay);
    }
};
/* --------------------------------- Array Utils ---------------------------------- */
export const circularSlice = (arr, start, end) =>
    end < start ? arr.slice(start).concat(arr.slice(0, end + 1)) : arr.slice(start, end + 1);

/* -------------------------------- Format Utils ---------------------------------- */

/* Settiamo lo style come valuta e prendiamo la valuta Euro. de-DE sta per Germania */
export const formatNumber = (number) =>
    new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR'
    }).format(number);

/* Set data from dd/mm/yyyy to yyyy-mm-dd */
export const formatDate = (date) =>
    new Date(date.getTime() - (date.getTimezoneOffset() * 60 * 1000))
        .toISOString().split('T')[0];

/* Set general date with options */
export const formatDayMonthYearDate = (date, options) => new Date(date).toLocaleDateString("it-IT", options);

/* ---------------------------------- Dates Utils ---------------------------------- */

/* Date sorting: Così facendo viene ordinato l'array padre, utilizzando slice() prima di sort si ordina solo la variabile */
export const dateSorting = (object, growing = false) => {
    return growing ? object.sort((a, b) => a.from - b.from) : object.sort((a, b) => b.from - a.from)
};

export const rangeDate = ((startDate, endDate) => {
    const oneDayMilliseconds = 24 * 60 * 60 * 1000
    return endDate ? Math.round((new Date(endDate) - new Date(startDate)) / oneDayMilliseconds) : 0
});

export const daysLate = (startDate, endDate, redeliveryDate) =>
    Math.abs(rangeDate(startDate, endDate) - rangeDate(startDate, redeliveryDate))

/* ------------------------------- Components Utils --------------------------------- */
export const averageReviews = (reviews => reviews.reduce((sum, {rating}) => sum + rating, 0) / reviews.length);

/* Nel caso di ritardo: per ogni giorno di ritardo maggiorazione del 100% */
export const calculateTotal = (dailyFee, fixedFee, startDate, endDate, redeliveryDate) => {
    return parseFloat(dailyFee) * rangeDate(startDate, endDate) + parseFloat(fixedFee) + daysLate(startDate, endDate, redeliveryDate) * (dailyFee * 2);
}

/* -------------------------------- Mutations Utils --------------------------------- */
export const destructurePayload = resData => Object.values(resData[Object.keys(resData)]);

export const parseMutationResponse = (setState, applyData) => (resData) => {
    const payload = destructurePayload(resData)
    if (payload[0])
        setState(applyData ? prevState => applyData(prevState, payload[0]) : payload[0])
    return payload[1]
};

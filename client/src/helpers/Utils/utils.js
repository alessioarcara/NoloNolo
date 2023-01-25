import {IMAGE_PATH} from "./constants";

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
    return growing ?
        object.slice().sort((a, b) => new Date(a.from) - new Date(b.from)) :
        object.slice().sort((a, b) => new Date(b.from) - new Date(a.from))
};

export const rangeDate = ((startDate, endDate) => {
    const oneDayMilliseconds = 24 * 60 * 60 * 1000
    return endDate ? Math.round((new Date(endDate) - new Date(startDate)) / oneDayMilliseconds) : 0
});

export const daysLate = (startDate, endDate, redeliveryDate) =>
    Math.max(0, (rangeDate(startDate, redeliveryDate) - rangeDate(startDate, endDate)))

export const rentedDatesExceptUserDates = (rentedDates, userStartDate, userEndDate) =>
    rentedDates ? rentedDates.filter(rentedDate => rentedDate.from !== userStartDate && rentedDate.to !== userEndDate) : []

/* ------------------------------- Components Utils --------------------------------- */
export const averageReviews = (reviews => reviews.reduce((sum, {rating}) => sum + rating, 0) / reviews.length);

/* Nel caso di ritardo: per ogni giorno di ritardo maggiorazione del 100% */
export const calculateTotal = (dailyFee, fixedFee, startDate, endDate, redeliveryDate) =>
    parseFloat(dailyFee) * rangeDate(startDate, endDate) + parseFloat(fixedFee)
        + daysLate(startDate, endDate, redeliveryDate) * (dailyFee * 2);

export const aggregateBoatsWithRentals = (boats, rentals) =>
    [...boats, ...rentals].reduce(
        (acc, item, i) => {
            if (i < boats.length) {
                acc[item._id] = {...item, isRented: false}
            } else {
                if (new Date(item.from) <= new Date() && acc[item.boat._id])
                    acc[item.boat._id].isRented = true
            }
            return acc
        },
        {}
    )

export const aggregateAdvertisementsWithRentals = (advertisements, rentals) =>
    [...advertisements, ...rentals].reduce(
        (acc, item, i) => {
            if (i < advertisements.length) {
                acc[item._id] = {...item, rentals: []}
            } else {
                acc[item.boat._id] && acc[item.boat._id].rentals.push(item)
            }
            return acc
        },
        {}
    )

/* -------------------------------- Mutations Utils --------------------------------- */
export const destructurePayload = resData => Object.values(resData[Object.keys(resData)]);

export const parseQueryResponse = resData => resData[Object.keys(resData)]

/* apply: functions */
export const parseMutationResponse = (setState, applyData, navigate, applyWhere) => (resData) => {
    const payload = destructurePayload(resData)
    if (payload[0])
        setState(applyData ? prevState => applyData(prevState, payload[0]) : payload[0])
    navigate && navigate(applyWhere(payload[0]))
    return payload[1]
};

/* ----------------------------------- Image Utils ---------------------------------- */
export const getImagePath = (userObject) => `${IMAGE_PATH}${userObject.substring(1)}`


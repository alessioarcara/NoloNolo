
/* Set general date with options */
export const formatDayMonthYearDate = (date, options) =>
    new Date(date).toLocaleDateString("it-IT", options)

export const destructurePayload = resData => Object.values(resData[Object.keys(resData)]);

export const parseMutationResponse = (setState, applyData) => (resData) => {
    const payload = destructurePayload(resData)
    if (payload[0])
        setState(applyData ? prevState => applyData(prevState, payload[0]) : payload[0])
    return payload[1]
};


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

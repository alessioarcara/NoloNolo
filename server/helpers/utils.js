exports.dateToString = date => new Date(date).toISOString();
exports.isImage = file => ["image/jpeg", "image/png"].includes(file);
exports.rangeDate = (startDate, endDate) => Math.round((new Date(endDate) - new Date(startDate)) / (24 * 60 * 60 * 1000));
exports.startOfDay = date => new Date(date).setUTCHours(0, 0, 0);


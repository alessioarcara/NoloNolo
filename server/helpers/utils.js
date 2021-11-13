exports.dateToString = date => new Date(date).toISOString();
exports.isImage = file => ["image/jpeg", "image/png"].includes(file);

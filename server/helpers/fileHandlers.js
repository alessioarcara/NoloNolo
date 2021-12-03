const {access, mkdir, rm, unlink} = require("fs/promises");

exports.getUserDir = userId => `./public/images/${userId}`;

exports.isImage = file => ["image/jpeg", "image/png"].includes(file);

exports.mkDir = DIR_PATH => access(DIR_PATH)
        .catch(async () => await mkdir(DIR_PATH, {recursive: true})
            .catch(() => console.log(`Can't create user dir.`))
        );

exports.rmDir = DIR_PATH => access(DIR_PATH)
        .then(async () => await rm(DIR_PATH, {recursive: true}))
        .catch(() => console.log("Can't find user dir"));

exports.rmFile = FILE_PATH => unlink(FILE_PATH)
    .catch(() => console.log("unlink failed"));


const {createWriteStream, unlink} = require('fs');
const sharp = require('sharp');
const {notImage, userNotFound, boatNotFound, noFileAttached} = require("../../helpers/problemMessages");
const User = require("../../models/user");
const Boat = require("../../models/boat");
const {transformUser, transformBoat} = require("./merge");
const {authenticated} = require("../../auth/auth");
const {mkDir, rmDir, rmFile, isImage, getUserDir} = require("../../helpers/fileHandlers");


const storeFile = async (upload, filePath, resize = false) => {
    const {filename, mimetype, createReadStream} = await upload;

    if (!isImage(mimetype)) return { problem: notImage }

    const stream = createReadStream();
    const USER_DIR = getUserDir(filePath);

    await mkDir(USER_DIR)

    const path = `${USER_DIR}/${Date.now()}-${filename}`

    // Store the file in the filesystem.
    await new Promise((resolve, reject) => {
        // Create a stream to which the upload will be written.
        const out = createWriteStream(path)
        // When the upload is fully written, resolve the promise.
        out.on('finish', resolve)
        // If there's an error writing the file, remove the partially written file
        // and reject the promise.
        out.on('error', (error) => {
            unlink(path, () => {
                reject(error)
            });
        });

        //  errors are not automatically propagated between piped streams.
        //  If there is an error receiving the upload, destroy the write
        //  stream with the corresponding error.
        stream.on('error', (error) => out.destroy(error));

        // Pipe the upload into the write stream.
        if (resize) {
            const transformer = sharp().resize(500, 500, {
                kernel: sharp.kernel.nearest
            }).jpeg()
            return stream.pipe(transformer).pipe(out)
        }
        stream.pipe(out)
    });

    return { path };
}


module.exports = {
    addAvatar: authenticated(async ({upload}, {req}) => {
        try {
            // if (!upload.file) return { addAvatarProblem: noFileAttached }
            const user = await User.findById(req.userId)
            if (!user) return { addAvatarProblem: userNotFound }

            const pathObj = await storeFile(upload.promise, req.userId, true)
            if (pathObj.problem) return { addAvatarProblem: pathObj.problem}
            if (user.avatar) await rmFile(user.avatar)
            user.avatar = pathObj.path

            await user.save()
            return { addAvatarData: transformUser(user, true) }
        } catch (err) { throw new Error(`Can't add avatar. ${err}`); }
    }),
    addBoatImages: authenticated(async ({files, boatId}, {req}) => {
        try {
            if (files.length === 0) return {addBoatImagesProblem: noFileAttached}
            const boat = await Boat.findOne({
                    $and: [
                        {_id: boatId},
                        {shipowner: req.userId},
                        {advertisement: {$exists: true}}
                    ]
                }
            )
            if (!boat) return {addBoatImagesProblem: boatNotFound}

            const userBoatPath = `${req.userId}/${boatId}`
            await rmDir(getUserDir(userBoatPath))

            const results = await Promise.allSettled(files.map(({promise}) => storeFile(promise, userBoatPath)))

            let imagesPath = [];
            for (let i=0; i < results.length; i++) {
                if (results[i].status === "fulfilled") {
                    if (results[i].value.problem) return {addBoatImagesProblem: results[i].value.problem}
                    imagesPath.push(results[i].value.path)
                }
            }

            boat.advertisement.images = imagesPath;
            await boat.save()

            return {addBoatImagesData: transformBoat(boat.toObject())}
        } catch (err) { throw new Error(`Can't add boat images. ${err}`)}
    })
}

const {createWriteStream, unlink, existsSync, promises} = require('fs');
const sharp = require('sharp');
const {isImage} = require("../../helpers/utils");
const {notImage, userNotFound, noFileAttached} = require("../../helpers/problemMessages");
const User = require("../../models/user");
const {transformUser} = require("./merge");
const {authenticated} = require("../../auth/auth");

const clearAvatar = filePath => {
    unlink(filePath, err => err && console.log(`unlink failed: ${err}`))
}

const storeFile = async (upload, userId, resize = false) => {
    const {filename, mimetype, createReadStream} = await upload;

    if (!isImage(mimetype)) return { problem: notImage }

    const stream = createReadStream();
    const USER_DIR = `./public/images/${userId}`;

    if (!existsSync(USER_DIR)) {
        await promises.mkdir(USER_DIR, {recursive: true})
    }

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
    addAvatar: authenticated(async ({upload, description}, {req}) => {
        try {
            if (!upload.file) return { addAvatarProblem: noFileAttached }
            const user = await User.findById(req.userId)
            if (!user) return { addAvatarProblem: userNotFound }

            const pathObj = await storeFile(upload.file, req.userId, true)
            if (pathObj.problem) return { addAvatarProblem: pathObj.problem}
            if (user.avatar) clearAvatar(user.avatar)
            user.avatar = pathObj.path

            await user.save()
            return { addAvatarData: transformUser(user) }
        } catch (err) { throw new Error(`Can't add avatar. ${err}`); }
    }),
    addBoatImages: async () => {
    }
}

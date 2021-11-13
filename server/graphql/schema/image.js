const imageType = `
       type addAvatarPayload {
            addAvatarData: User
            addAvatarProblem: String
       }
       
       input ImageInput {
            file: Upload!
       }
`

module.exports = imageType;

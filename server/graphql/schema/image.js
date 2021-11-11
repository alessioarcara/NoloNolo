const imageType = `
       type Image {
            _id: ID!
            fileLocation: String
            description: String
       }
       
       type addImagePayload {
            addImageData: Image
            addImageProblem: String
       }
       
       input ImageInput {
            file: Upload!
            description: String
       }
`

module.exports = imageType;

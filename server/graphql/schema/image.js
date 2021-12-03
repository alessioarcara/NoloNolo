const imageType = `
       type addAvatarPayload {
           addAvatarData: User
           addAvatarProblem: String
       }
       
       type addBoatImagesPayload {
           addBoatImagesData: Boat
           addBoatImagesProblem: String
       }
       
       input AddBoatImagesInput {
           boatId: ID!
           files: [Upload!]!
       } 
`

module.exports = imageType;

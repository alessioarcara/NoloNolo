const {buildSchema} = require('graphql');
const authType = require('./auth')
const boatType = require('./boat')
const locationType = require('./location')
const advertisementType = require('./advertisement')
const reviewType = require('./review')


const rootSchema = `
        ${authType}
        ${boatType}
        ${locationType}
        ${advertisementType}
        ${reviewType}
        
        type RootQuery {
            refreshToken: AuthData!
            user: User!
            boats(filter: BoatFilter!, skip: Int, take: Int = 10): [Boat!]
            listAllLocations(filter: LocationFilter!): [Location!]
        }
        
        type RootMutation {
            login(email: String!, password: String!): AuthenticationPayload!
            createUser(inputUser: UserInput!): AuthenticationPayload!
            invalidateTokens: Boolean!
            addBoat(inputBoat: BoatInput!): addBoatPayload!
            publishAdvertisement(inputAdvertisement: AdvertisementInput!): publishAdvertisementPayload!
            publishReview(inputReview: ReviewInput!): publishReviewPayload!
        }
        
        schema {
            query: RootQuery
            mutation: RootMutation
        }      
`
module.exports = buildSchema(rootSchema);

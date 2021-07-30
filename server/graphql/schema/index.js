const {buildSchema} = require('graphql');
const authType = require('./auth')
const boatType = require('./boat')

const rootSchema = `
        ${authType}
        ${boatType}
        
        type RootQuery {
            refreshToken: AuthData!
            user: User!
            boats(filter: BoatFilter): [Boat!]
        }
        
        type RootMutation {
            login(email: String!, password: String!): AuthenticationPayload!
            createUser(inputUser: UserInput!): AuthenticationPayload!
            invalidateTokens: Boolean!
            addBoat(inputBoat: BoatInput!): addBoatPayload!
            publishAdvertisement(inputAdvertisement: AdvertisementInput!): createAdvertisementPayload!
        }
        
        schema {
            query: RootQuery
            mutation: RootMutation
        }      
`
module.exports = buildSchema(rootSchema);

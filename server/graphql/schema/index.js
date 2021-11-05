const {buildSchema} = require('graphql');
const authType = require('./auth')
const boatType = require('./boat')
const locationType = require('./location')
const advertisementType = require('./advertisement')
const reviewType = require('./review')
const rentalType = require('./rental')
const favoriteType = require("./favorite");


const rootSchema = `
        ${authType}
        ${boatType}
        ${locationType}
        ${advertisementType}
        ${favoriteType}
        ${reviewType}
        ${rentalType}
        
        type RootQuery {
            refreshToken: AuthData!
            user: User!
            boat(boatId: ID!): Boat!
            boats(filter: BoatFilter!, skip: Int, take: Int): [Boat!]
            boatsByUser: [Boat!]
            boatRentals(boatId: ID!): [Rental!]
            listAllLocations(filter: LocationFilter!): [Location!]
            favorites: [Boat!]
        }
        
        type RootMutation {
            login(email: String!, password: String!): AuthenticationPayload!
            createUser(inputUser: UserInput!): AuthenticationPayload!
            invalidateTokens: Boolean!
            addBoat(inputBoat: BoatInput!): addBoatPayload!
            publishAdvertisement(inputAdvertisement: AdvertisementInput!): publishAdvertisementPayload!
            addFavorite(boatId: ID!): FavoritesPayload!
            removeFavorite(boatId: ID!): FavoritesPayload!
            publishReview(inputReview: ReviewInput!): publishReviewPayload!
            rentBoat(inputRental: RentalInput!): rentBoatPayload!
        }
        
        schema {
            query: RootQuery
            mutation: RootMutation
        }      
`
module.exports = buildSchema(rootSchema);

const {buildSchema} = require('graphql');
const authType = require('./auth')
const boatType = require('./boat')
const locationType = require('./location')
const advertisementType = require('./advertisement')
const reviewType = require('./review')
const rentalType = require('./rental')
const favoriteType = require("./favorite");
const imageType = require("./image");

const rootSchema = `
        ${authType}
        ${boatType}
        ${locationType}
        ${advertisementType}
        ${favoriteType}
        ${reviewType}
        ${rentalType}
        ${imageType}
        
        scalar Upload
        
        type RootQuery {
            refreshToken: AuthData!
            user: User!
            boat(boatId: ID!): Boat!
            boats(filter: BoatFilter!, skip: Int, take: Int): [Boat!]
            boatsByUser: [Boat!]
            rentalsByUser: [Rental!]
            boatRentals(boatId: ID!): [Rental!]
            listAllLocations(filter: LocationFilter!): [Location!]
            favorites: [Boat!]
        }
        
        type RootMutation {
            createUser(inputUser: UserInput!): AuthenticationPayload!
            login(inputUser: UserInput!): AuthenticationPayload!
            updateUser(inputUpdateUser: UpdateUserInput!): updateUserPayload!
            changePassword(inputChangePassword: ChangePasswordInput!): changePasswordPayload!
            invalidateTokens: Boolean!
            addBoat(inputBoat: BoatInput!): addBoatPayload!
            publishAdvertisement(inputAdvertisement: AdvertisementInput!): publishAdvertisementPayload!
            addFavorite(boatId: ID!): FavoritesPayload!
            removeFavorite(boatId: ID!): FavoritesPayload!
            rentBoat(inputRentBoat: RentBoatInput!): rentBoatPayload!
            updateRental(inputUpdateRental: UpdateRentalInput!): updateRentalPayload!
            deleteRental(rentalId: ID!): deleteRentalPayload!
            publishReview(inputReview: ReviewInput!): publishReviewPayload!
            addAvatar(upload: Upload!): addAvatarPayload!
        }
        
        schema {
            query: RootQuery
            mutation: RootMutation
        }      
`


module.exports = buildSchema(rootSchema);

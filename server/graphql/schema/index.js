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
        
        scalar Upload
        
        type RootQuery {
            refreshToken: AuthData!
            user: User!
            boatsByUser: [Boat!]
            advertisement(boatId: ID!): Boat!
            advertisements(filter: BoatFilter!, skip: Int, take: Int): [Boat!]
            advertisementsByShipowner: [Boat!]
            rentals: [Rental!]
            boatRentals(boatId: ID!): [Rental!]
            rentalsByUser: [Rental!]
            rentalsByShipowner: [Rental!]
            listAllLocations(filter: LocationFilter!): [Location!]
            favorites: [Boat!]
        }
        
        type RootMutation {
            createUser(inputUser: UserInput!): AuthenticationPayload!
            login(inputUser: UserInput!): AuthenticationPayload!
            invalidateTokens: Boolean!
            updateUser(inputUpdateUser: UpdateUserInput!): updateUserPayload!
            changePassword(inputChangePassword: ChangePasswordInput!): changePasswordPayload!
            addAvatar(upload: Upload!): addAvatarPayload!
            addBoat(inputBoat: BoatInput!): addBoatPayload!
            removeBoat(boatId: ID!): removeBoatPayload!
            insertBoatLocation(inputInsertBoatLocation: InsertBoatLocationInput!): insertBoatLocationPayload!
            publishAdvertisement(inputPublishAdvertisement: PublishAdvertisementInput!): publishAdvertisementPayload!
            withdrawAdvertisement(boatId: ID!): withdrawAdvertisementPayload!
            rentBoat(inputRentBoat: RentBoatInput!): rentBoatPayload!
            updateRental(inputUpdateRental: UpdateRentalInput!): updateRentalPayload!
            backdateRental(inputUpdateRental: UpdateRentalInput!): backdateRentalPayload!
            recordBoatReturn(rentalId: ID!): recordBoatReturnPayload!
            deleteRental(rentalId: ID!): deleteRentalPayload!
            publishReview(inputReview: ReviewInput!): publishReviewPayload!
            addFavorite(boatId: ID!): FavoritesPayload!
            removeFavorite(boatId: ID!): FavoritesPayload!
        }
        
        schema {
            query: RootQuery
            mutation: RootMutation
        }      
`


module.exports = buildSchema(rootSchema);

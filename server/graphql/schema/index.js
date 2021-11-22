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
            boatRentals(boatId: ID!): [Rental!]
            listAllLocations(filter: LocationFilter!): [Location!]
            favorites: [Boat!]
        }
        
        type RootMutation {
            login(inputUser: UserInput!): AuthenticationPayload!
            createUser(inputUser: UserInput!): AuthenticationPayload!
            updateUser(inputUpdateUser: UpdateUserInput!): updateUserPayload!
            changePassword(inputChangePassword: ChangePasswordInput!): changePasswordPayload!
            invalidateTokens: Boolean!
            addBoat(inputBoat: BoatInput!): addBoatPayload!
            removeBoat(boatId: ID!): removeBoatPayload!
            insertBoatLocation(inputInsertBoatLocation: InsertBoatLocationInput!): insertBoatLocationPayload!
            publishAdvertisement(inputPublishAdvertisement: PublishAdvertisementInput!): publishAdvertisementPayload!
            addFavorite(boatId: ID!): FavoritesPayload!
            removeFavorite(boatId: ID!): FavoritesPayload!
            publishReview(inputReview: ReviewInput!): publishReviewPayload!
            rentBoat(inputRental: RentalInput!): rentBoatPayload!
            addAvatar(upload: Upload!): addAvatarPayload!
        }
        
        schema {
            query: RootQuery
            mutation: RootMutation
        }      
`

// addImage(inputImage: ImageInput!): addImagePayload!

module.exports = buildSchema(rootSchema);

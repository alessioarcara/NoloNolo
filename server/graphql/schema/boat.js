const boatType = `  
        type Boat {
            owner: User!
            yard: String!
            model: String!
            length: String!
            maximumCapacity: Int!
            boatType: BoatType!
            isDocked: Location!
            hasAdvertisement: Advertisement
        }
        
        type Location {
            city: String!
            harbour: String!
        }
              
        type Advertisement {
            _id: ID!
            preferredBy: [User!]
            description: String!
            fixedFee: Float!
            dailyFee: Float!
            images: [String!]
            reviews: [Review!]
        }
        
        type Review {
            body: String!
            rating: Int!
            createdAt: String!
            creator: User!
        }
        
        type addBoatPayload {
            addBoatData: Boat
            addBoatProblem: String
        }
        
        type createAdvertisementPayload {
            createAdvertisementData: Advertisement
            createAdvertisementProblem: String
        }
        
        input BoatInput {
            yard: String!
            model: String!
            length: String!
            maximumCapacity: Int!
            boatType: BoatType!
            isDocked: LocationInput!
            publishAdvertisement: AdvertisementInput
        }
        
        input LocationInput {
            city: String!
            harbour: String!
        }
        
        input AdvertisementInput {
            description: String
            fixedFee: Float
            dailyFee: Float
            images: [String!]
        }
        
        input BoatFilter {
            where: String
            skip: Int
            take: Int = 10
        }
        
        enum BoatType {
            sailboat
            motorboat
            catamaran
            dinghy
        }
`

module.exports = boatType;

const boatType = `  
        type Boat {
            _id: ID!
            owner: User!
            yard: String!
            model: String!
            length: String!
            maximumCapacity: Int!
            boatType: BoatType!
            isDocked: Location!
            hasAdvertisement: Advertisement
        }
        
        type addBoatPayload {
            addBoatData: Boat
            addBoatProblem: String
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

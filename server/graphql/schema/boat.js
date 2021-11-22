const boatType = `  
        type Boat {
            _id: ID!
            owner: User!
            yard: String!
            model: String!
            length: Int!
            maximumCapacity: Int!
            boatType: BoatType!
            isDocked: Location
            hasAdvertisement: Advertisement
            totalCount: Int
            minPrice: Float
            maxPrice: Float
        }
        
        type addBoatPayload {
            addBoatData: Boat
            addBoatProblem: String
        }
        
        type removeBoatPayload {
            removedBoatId: ID
            removeBoatProblem: String
        }
        
        type insertBoatLocationPayload {
            insertBoatLocationData: Boat
            insertBoatLocationProblem: String
        }
        
        input BoatInput {
            _id: ID
            yard: String!
            model: String!
            length: Int!
            maximumCapacity: Int!
            boatType: BoatType!
        }
        
        input InsertBoatLocationInput {
            boatId: ID!
            isDocked: LocationInput!
        }
        
        input BoatFilter {
            city: String
            region: String!
            from: String
            to: String
            boatTypes: [BoatType!]
            minPrice: Int
            maxPrice: Int
            minCapacity: Int
        }
        
        enum BoatType {
            sailboat
            motorboat
            catamaran
            dinghy
        }
`

module.exports = boatType;

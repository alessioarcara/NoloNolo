const RentalType = `
    type Rental {
        _id: ID!
        customer: User!
        boat: Boat!
        from: String!
        to: String!
        bill: Float!
        createdAt: String
        updatedAt: String
    }
    
    type rentBoatPayload {
        rentBoatData: Rental
        rentBoatProblem: String
    }
    
    input RentalInput {
        boatId: ID!
        from: String!
        to: String!
        bill: Float!
    }
`

module.exports = RentalType;

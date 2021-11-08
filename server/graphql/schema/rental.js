const RentalType = `
    type Rental {
        _id: ID!
        customer: User!
        boat: Boat!
        from: String!
        to: String!
        totalAmount: Float!
        billNumber: Int!
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
        totalAmount: Float!
    }
`

module.exports = RentalType;

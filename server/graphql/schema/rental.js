const RentalType = `
    type Rental {
        _id: ID!
        customer: User!
        boat: Boat!
        from: String!
        to: String!
        redelivery: String
        dailyFee: Float!
        fixedFee: Float!
        billNumber: Int!
        createdAt: String
        updatedAt: String
    }
    
    type rentBoatPayload {
        rentBoatData: Rental
        rentBoatProblem: String
    }
    
    type updateRentalPayload {
        updateRentalData: Rental
        updateRentalProblem: String
    }
    
    type backdateRentalPayload {
        backdateRentalData: Rental
        backdateRentalProblem: String
    }
    
    type recordBoatReturnPayload {
        recordBoatReturnData : Rental
        recordBoatReturnProblem: String
    }
    
    type deleteRentalPayload {
        deletedRentalId: ID
        deleteRentalProblem: String
    }
    
    input RentBoatInput {
        boatId: ID!
        from: String!
        to: String!
    }
    
    input UpdateRentalInput {
        rentalId: ID!
        from: String!
        to: String!
    }
`

module.exports = RentalType;

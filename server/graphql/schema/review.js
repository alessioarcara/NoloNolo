const reviewType = `
        type Review {
            _id: ID!
            body: String!
            rating: Int!
            createdAt: String!
            creator: User!
        }
        
        type publishReviewPayload {
            publishReviewData: Review
            publishReviewProblem: String
        }
        
        input ReviewInput {
            rentalId: ID!
            body: String!
            rating: Int!
        }
`

module.exports = reviewType;

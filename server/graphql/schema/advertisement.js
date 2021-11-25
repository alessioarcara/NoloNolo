const advertisementType = `
        type Advertisement {
            _id: ID!
            preferredBy: [User!]
            description: String!
            fixedFee: Float!
            dailyFee: Float!
            images: [String!]
            reviews: [Review!]
        }

        type publishAdvertisementPayload {
            publishAdvertisementData: Advertisement
            publishAdvertisementProblem: String
        }
        
        type withdrawAdvertisementPayload {
            withdrawnAdvertisementId: ID
            withdrawAdvertisementProblem: String
        }

        input AdvertisementInput {
            description: String
            fixedFee: Float
            dailyFee: Float
            images: [String!]
        }
`

module.exports = advertisementType;

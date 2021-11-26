const advertisementType = `
        type Advertisement {
            _id: ID!
            preferredBy: [User!]
            description: String!
            fixedFee: Float!
            dailyFee: Float!
            images: [String!]
        }

        type publishAdvertisementPayload {
            publishAdvertisementData: Advertisement
            publishAdvertisementProblem: String
        }
        
        input PublishAdvertisementInput {
            boatId: ID!
            publishAdvertisement: AdvertisementInput!
        }
        
        type withdrawAdvertisementPayload {
            withdrawnAdvertisementId: ID
            withdrawAdvertisementProblem: String
        }

        input AdvertisementInput {
            description: String!
            fixedFee: Float!
            dailyFee: Float!
            images: [String!]
        }
`

module.exports = advertisementType;

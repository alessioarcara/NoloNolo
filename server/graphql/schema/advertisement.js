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
        
        input PublishAdvertisementInput {
            boatId: ID!
            publishAdvertisement: AdvertisementInput!
        }

        input AdvertisementInput {
            description: String!
            fixedFee: Float!
            dailyFee: Float!
            images: [String!]
        }
`

module.exports = advertisementType;

const locationType = `
        type Location {
            region: String!
            city: String
            harbour: String
            coordinates: [Float!]
        }
        
        input LocationInput {
            region: String!
            city: String!
            harbour: String!
            latitude: Float!
            longitude: Float!
        }

        input LocationFilter {
            contains: String!
            take: Int = 10
        }
`

module.exports = locationType;

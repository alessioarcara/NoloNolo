const locationType = `
        type Location {
            region: String!
            city: String
            harbour: String
        }
        
        input LocationInput {
            region: String!
            city: String!
            harbour: String!
        }
        
        input LocationFilter {
            contains: String!
            take: Int = 10
        }
`

module.exports = locationType;

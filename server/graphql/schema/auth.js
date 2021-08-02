const AuthType = `
        type User {
            _id: ID!
            email: String!
            address: Address
            avatar: String
            userType: String!
        }
        
        type Address {
            street: String
            city: String
            region: String
            postalCode: Int
        }
        
        type AuthData {
            userId: ID!
            token: String!
        }
        
        type AuthenticationPayload {
            authData: AuthData
            authProblem: String
        }
        
        input UserInput {
            email: String!
            password: String!
        }
        
        enum userType {
            customer
            shipowner
            admin
        }
`

module.exports = AuthType;
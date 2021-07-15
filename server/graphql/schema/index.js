const {buildSchema} = require('graphql')

module.exports = buildSchema(`
        type User {
            _id: ID!
            email: String!
            password: String
        }
        
        type AuthData {
            userId: ID!
            token: String!
            tokenExpiration: Int!
        }
        
        input UserInput {
            email: String!
            password: String!
        }
        
        type RootQuery {
            login(email: String!, password: String!): AuthData!
            refreshToken: AuthData!
        }
        
        type RootMutation {
            createUser(inputUser: UserInput!): AuthData!
        }
        
        schema {
            query: RootQuery
            mutation: RootMutation
        }
`)


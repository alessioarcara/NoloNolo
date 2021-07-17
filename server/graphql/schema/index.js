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
        }
        
        input UserInput {
            email: String!
            password: String!
        }
        
        type RootQuery {
            login(email: String!, password: String!): AuthData!
            refreshToken: AuthData!
            users: [User!]!
        }
        
        type RootMutation {
            createUser(inputUser: UserInput!): AuthData!
            invalidateTokens: Boolean!
        }
        
        schema {
            query: RootQuery
            mutation: RootMutation
        }
`)


const {buildSchema} = require('graphql');
const authType = require('./auth')

const rootSchema = `
        ${authType}
        type RootQuery {
            login(email: String!, password: String!): AuthenticationPayload!
            refreshToken: AuthData!
            user: User!
        }
        
        type RootMutation {
            createUser(inputUser: UserInput!): AuthenticationPayload!
            invalidateTokens: Boolean!
        }
        
        schema {
            query: RootQuery
            mutation: RootMutation
        }      
`

module.exports = buildSchema(rootSchema);

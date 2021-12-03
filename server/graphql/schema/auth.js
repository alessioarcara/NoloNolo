const AuthType = `
        type User {
            _id: ID!
            email: String!
            address: Address
            avatar: String
            userType: String!
            createdAt: String!
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
        
        type updateUserPayload {
            updateUserData: User
            updateUserProblem: String
        }
        
        type deleteUserPayload {
            deletedUserId: ID
            deleteUserProblem: String
        }
        
        type changePasswordPayload {
            changePasswordData: User
            changePasswordProblem: String
        }
        
        input UserInput {
            email: String!
            password: String!
        }
        
        input UpdateUserInput {
            street: String
            city: String
            region: String
            postalCode: Int
        }
        
        input ChangePasswordInput {
            oldPassword: String!
            newPassword: String!
        }
        
        enum userType {
            customer
            shipowner
            admin
        }
`

module.exports = AuthType;

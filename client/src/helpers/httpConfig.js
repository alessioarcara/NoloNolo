exports.body_login = (email, password) => {
    return {
        query: `
          mutation($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              authData {
                userId
                token
              }
              authProblem
            }
          }
        `,
        variables: {email, password}
    }
};
exports.body_signup = ({enteredEmail, enteredPassword}) => {
    return {
        query: `
          mutation($userData: UserInput!) {
            createUser(inputUser: $userData) {
              authData {
                userId
                token
              }
              authProblem
            }  
          }
        `,
        variables: {userData: {email: enteredEmail, password: enteredPassword}}
    }
};
exports.body_boats = ({where, skip}) => {
    return {
        query: `
           query($filter: BoatFilter!) {
              boats(filter: $filter) {
                 _id
                 model
                 hasAdvertisement {
                    description
                    images
                    dailyFee
                    reviews {
                      rating
                    }
                 }
              }
           }
        `,
        variables: {filter: {where, skip}}
    }
};
exports.body_search = (contains) => {
    return {
        query: `
            query($filter: LocationFilter!) {
                listAllLocations(filter: $filter) {
                    region
                    city
                }
            }
        `,
        variables: {filter: {contains}}
    }
}
exports.body_refresh = {
    query: `
          query {
            refreshToken {
              userId
              token
            }  
          }
        `,
};
exports.invalidate = {
    query: `
          mutation {
            invalidateTokens
          }
        `,
};
exports.body_user = {
    query: `
    query {
        user {
            email
            userType
        }
    }`
};

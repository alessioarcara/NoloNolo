exports.body_login = (email, password) => {
    return {
        query: `
          query($email: String!, $password: String!) {
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
exports.body_refresh =  {
        query: `
          query {
            refreshToken {
              userId
              token
            }  
          }
        `,
};
exports.invalidate =  {
    query: `
          mutation {
            invalidateTokens
          }
        `,
};

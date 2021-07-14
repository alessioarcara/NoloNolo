exports.bodyLogin = (email, password) => {
    return {
        query: `
          query($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              userId
              token
              tokenExpiration
            }
          }
        `,
        variables: {email, password}
    }
};

exports.bodySignup = (userData) => {
    return {
        query: `
          mutation($userData: UserInput!) {
            createUser(inputUser: $userData) {
              userId
              token
              tokenExpiration
            }  
          }
        `,
        variables: {userData}
    }
};

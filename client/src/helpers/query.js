exports.body_login = (email, password) => {
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

exports.body_signup = ({enteredEmail, enteredPassword}) => {
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
        variables: {userData: {email: enteredEmail, password: enteredPassword}}
    }
};

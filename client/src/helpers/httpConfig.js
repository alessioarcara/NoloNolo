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
exports.body_boats = ({city, region, from, to, minCapacity, boatTypes, minPrice, maxPrice, skip, take}) => {
    return {
        query: `
           query($filter: BoatFilter! $skip: Int $take: Int) {
              boats(filter: $filter, skip: $skip, take: $take) {
                 _id
                 model
                 totalCount
                 maximumCapacity
                 minPrice
                 maxPrice
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
        variables: {filter: {region, city, from, to, minCapacity, boatTypes, minPrice, maxPrice}, skip, take}
    }
};
exports.body_informations = (boatId) => {
    return {
        query: `
           query BoatInformations($boatId: ID!) {
              boat(boatId: $boatId) {
                 owner {
                    email
                    avatar
                 }
                 model
                 yard
                 length
                 maximumCapacity
                 boatType
                 hasAdvertisement {
                    description
                    images
                    dailyFee
                    fixedFee
                    reviews {
                      _id
                      body
                      rating
                      createdAt
                      creator {
                        email
                        avatar
                      }
                    }
                 }
                 isDocked {
                    region
                    city
                    harbour
                    coordinates 
                 }
              }
              boatRentals(boatId: $boatId) {
                from
                to
              }
           }        
        `,
        variables: boatId
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
exports.body_favorites = {
    query: `
          query {
              favorites {
                  _id
                  model
                  maximumCapacity
                  hasAdvertisement {
                      images
                      description
                      dailyFee
                      reviews {
                          rating
                      }
                  }
              }  
          }
    `,
}
exports.body_addFavorite = (boatId) => {
    return {
        query: `
           mutation($boatId: ID!) {
              addFavorite(boatId: $boatId) {
                  favoritesData {
                      _id
                      model
                      maximumCapacity
                      hasAdvertisement {
                          images
                          description
                          dailyFee
                          reviews {
                              rating
                          }
                      }
                  }
                  favoritesProblem
              }
           }
           `,
        variables: boatId
    }
};
exports.body_removeFavorite = (boatId) => {
    return {
        query: `
           mutation($boatId: ID!) {
              removeFavorite(boatId: $boatId) {
                  favoritesData {
                      _id
                      model
                      maximumCapacity
                      hasAdvertisement {
                          images
                          description
                          dailyFee
                          reviews {
                              rating
                          }
                      }
                  }
                  favoritesProblem
              }
           }
           `,
        variables: boatId
    }
};
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

exports.body_login = ({enteredEmail, enteredPassword}) => {
    return {
        query: `
          mutation($userData: UserInput!) {
            login(inputUser: $userData) {
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
exports.body_changePassword = ({oldPassword, newPassword}) => {
    return {
        query: `
          mutation($passwordData: ChangePasswordInput!) {
              changePassword(inputChangePassword: $passwordData) {
                  changePasswordStatus
                  changePasswordProblem
            }  
          }
        `,
        variables: {passwordData: {oldPassword, newPassword}}
    }
};
exports.body_updateUser = ({street, city, region, postalCode}) => {
    return {
        query: `
            mutation($userData: UpdateUserInput!) {
                updateUser(inputUpdateUser: $userData) {
                    updateUserData {
                        street
                        city
                        region
                        postalCode
                    }
                    updateUserProblem
                }  
            }
        `,
        variables: {userData: {street, city, region, postalCode}}
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
exports.body_rentBoat = ({boatId, from, to}) => {
    return {
        query: `
            mutation($rentalData: RentalInput!) {
                rentBoat(inputRental: $rentalData) {
                    rentBoatData {
                        billNumber
                        from
                        to
                        totalAmount
                        boat {
                            model
                            yard
                            owner {
                                email
                            }
                            isDocked {
                                region
                                city
                                harbour
                            }
                        }
                        customer {
                            email
                        }
                        createdAt
                    }
                    rentBoatProblem
                }
            }
        `,
        variables: {rentalData: {boatId, from, to}}
    }
}
exports.body_boatRentals = (boatId) => {
    return {
        query: `
            query($boatId: ID!) {
                boatRentals(boatId: $boatId) {
                    from
                    to
                }
            }
        `,
        variables: boatId
    }
}
exports.body_deleteRental = (rentalId) => {
    return {
        query: `
            mutation($rentalId: ID!)
                deleteRental(rentalId: $rentalId) {
                    deleteRentalStatus
                    deleteRentalProblem
                }
        `,
        variables: rentalId
    }
}
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
exports.body_userBoats = {
    query: `
           query {
               boatsByUser {
                   _id
               }
           }
           `
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
            avatar
            address {
                street
                city
                region
                postalCode
            }
            userType
        }
    }`
};
exports.body_userRentals = {
    query: `
        query {
            rentalsByUser {
                _id
                billNumber
                from
                to
                redelivery
                totalAmount
                boat {
                    _id
                    model
                    yard
                    hasAdvertisement {
                        images
                        description
                        dailyFee
                        fixedFee
                    }
                    owner {
                        email
                    }
                    isDocked {
                        region
                        city
                        harbour
                    }
                }
                customer {
                    email
                }
                createdAt
            }
        }
    `
}
exports.body_addAvatar = {
    operations: `{ "query": "mutation ($file: Upload!) { addAvatar(upload: $file) { addAvatarData { email address { street city region postalCode } avatar } addAvatarProblem }  }", "variables": { "file": null } }`,
    map: `{"0": ["variables.file"]}`,

}

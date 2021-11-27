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
                    changePasswordData {
                        email
                        avatar
                        createdAt
                        address {
                            street
                            city
                            region   
                            postalCode
                        }
                    }
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
                        email
                        avatar
                        createdAt
                        address {
                            street
                            city
                            region
                            postalCode
                        }
                    }
                    updateUserProblem
                }  
            }
        `,
        variables: {userData: {street, city, region, postalCode}}
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
};
exports.body_advertisements = ({city, region, from, to, minCapacity, boatTypes, minPrice, maxPrice, skip, take}) => {
    return {
        query: `
            query($filter: BoatFilter! $skip: Int $take: Int) {
                advertisements(filter: $filter, skip: $skip, take: $take) {
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
                    }
                    reviews {
                        rating
                    }
                }
            }
        `,
        variables: {filter: {region, city, from, to, minCapacity, boatTypes, minPrice, maxPrice}, skip, take}
    }
};
exports.body_advertisement = (boatId) => {
    return {
        query: `
            query BoatInformations($boatId: ID!) {
                advertisement(boatId: $boatId) {
                    model
                    yard
                    length
                    maximumCapacity
                    boatType
                    owner {
                        email
                        avatar
                    }
                    hasAdvertisement {
                        description
                        images
                        dailyFee
                        fixedFee
                    }
                    isDocked {
                        region
                        city
                        harbour
                        coordinates 
                    }
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
                boatRentals(boatId: $boatId) {
                    from
                    to
                }
            }        
        `,
        variables: boatId
    }
};
exports.body_addBoat = ({yard, model, length, maximumCapacity, boatType, _id}) => {
    return {
        query: `
            mutation($boatData: BoatInput!) {
                addBoat(inputBoat: $boatData) {
                    addBoatData {
                        _id
                        yard
                        model
                        length
                        maximumCapacity
                        boatType
                        isDocked {
                            harbour
                            city
                            region
                            coordinates   
                        }
                    }
                    addBoatProblem
                }
            }
        `,
        variables: {boatData: {yard, model, length, maximumCapacity, boatType, _id}}
    }
};
exports.body_removeBoat = (boatId) => {
    return {
        query: `
            mutation($boatId: ID!) {
                removeBoat(boatId: $boatId) {
                    removedBoatId
                    removeBoatProblem
                }
            }
        `,
        variables: boatId
    }
};
exports.body_insertBoatLocation = ({boatId, harbour, city, region, latitude, longitude}) => {
    return {
        query: `
            mutation($locationData: InsertBoatLocationInput!) {
                insertBoatLocation(inputInsertBoatLocation: $locationData) {
                    insertBoatLocationData {
                        _id
                        yard
                        model
                        length
                        maximumCapacity
                        boatType
                        isDocked {
                            region
                            city
                            harbour
                            coordinates 
                        }
                    }
                    insertBoatLocationProblem
                }
            }
        `,
        variables: {locationData: {boatId, isDocked: {harbour, city, region, latitude, longitude}}}
    }
};
exports.body_publishAdvertisement = ({boatId, description, dailyFee, fixedFee}) => {
    return {
        query: `
            mutation($advertisementData: PublishAdvertisementInput!) {
                publishAdvertisement(inputPublishAdvertisement: $advertisementData) {
                    publishAdvertisementData {
                        _id
                    }
                    publishAdvertisementProblem
                }
            }
        `,
        variables: {advertisementData: {boatId, publishAdvertisement: {description, dailyFee, fixedFee}}}
    }
};
exports.body_rentBoat = ({boatId, from, to}) => {
    return {
        query: `
            mutation($rentalData: RentBoatInput!) {
                rentBoat(inputRentBoat: $rentalData) {
                    rentBoatData {
                        billNumber
                        from
                        to
                        dailyFee
                        fixedFee
                        createdAt
                        customer {
                            email
                        }
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
                                coordinates
                            }
                        }
                    }
                    rentBoatProblem
                }
            }
        `,
        variables: {rentalData: {boatId, from, to}}
    }
};
exports.body_updateRental = ({rentalId, from, to}) => {
    return {
        query: `
            mutation($rentalData: UpdateRentalInput!) {
                updateRental(inputUpdateRental: $rentalData) {
                    updateRentalData {
                        _id
                        billNumber
                        from
                        to
                        dailyFee
                        fixedFee
                        createdAt
                        customer {
                            _id
                            email
                        }
                        boat {
                            _id
                            yard
                            model
                            length
                            maximumCapacity
                            boatType
                            owner {
                                email
                            }
                            hasAdvertisement {
                                description
                                images
                                dailyFee
                                fixedFee
                            }
                            isDocked {
                                region
                                city
                                harbour
                            }
                            reviews {
                                _id
                                body
                                rating
                                rental
                                createdAt
                                creator {
                                    _id
                                    email
                                    avatar
                                }
                            }
                        }
                    }
                    updateRentalProblem
                }
            }
        `,
        variables: {rentalData: {rentalId, from, to}}
    }
};
exports.body_recordBoatReturn = (rentalId) => {
    return {
        query: `
          mutation($rentalId: ID!) {
              recordBoatReturn(rentalId: $rentalId) {
                  recordBoatReturnData {
                      _id
                      from
                      to
                      dailyFee
                      fixedFee
                      billNumber
                      createdAt
                      redelivery
                      boat {
                          _id
                          reviews {
                              rating
                              rental
                              creator {
                                  _id
                              }
                          }
                      }
                      customer {
                          _id
                          email
                      }
                  }
                  recordBoatReturnProblem
              }
          }
      `,
        variables: rentalId
    }
};
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
};
exports.body_deleteRental = (rentalId) => {
    return {
        query: `
            mutation($rentalId: ID!) {
                deleteRental(rentalId: $rentalId) {
                    deletedRentalId
                    deleteRentalProblem
                }
            }
        `,
        variables: rentalId
    }
};
exports.body_publishReview = ({rentalId, body, rating}) => {
    return {
        query: `
            mutation($reviewData: ReviewInput!) {
                publishReview(inputReview: $reviewData) {
                    publishReviewData {
                        body
                        rating
                        rental
                        createdAt
                        creator {
                            _id
                        }
                    }
                    publishReviewProblem
                }
            }
        `,
        variables: {reviewData: {rentalId, body, rating}}
    }
};
exports.body_shipownerAdvertisements = {
    query: `
        query shipownerAdvertisements {
            advertisementsByShipowner {
                _id
                yard
                model
                hasAdvertisement {
                    images
                    preferredBy {
                        _id
                    }
                }
                isDocked {
                    region
                    city
                    harbour
                }
                reviews {
                    _id
                    rating
                }
            }
            rentalsByShipowner {
                _id
                from
                to
                redelivery
                dailyFee
                fixedFee
                billNumber
                createdAt
                boat {
                    _id
                    model
                    yard
                    owner {
                        email
                    }
                    isDocked {
                        city
                        region
                        harbour
                    }
                    reviews {
                        rating
                        rental
                        creator {
                            _id
                        }
                    }
                }
                customer {
                    _id
                    email
                }
            }
        }
    `
};
exports.body_withdrawAdvertisement = (boatId) => {
    return {
        query: `
            mutation($boatId: ID!) {
                withdrawAdvertisement(boatId: $boatId) {
                    withdrawnAdvertisementId
                    withdrawAdvertisementProblem
                }
            }
        `,
        variables: boatId
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
                }
                reviews {
                    rating
                }
            }  
        }
    `,
};
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
                        }
                        reviews {
                            rating
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
                        }
                        reviews {
                            rating
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
                yard
                model
                length
                maximumCapacity
                boatType
                isDocked {
                    harbour
                    city
                    region
                    coordinates
                }
            }
            user {
                email
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
                userType
                createdAt
                address {
                    street
                    city
                    region
                    postalCode
                }
            }
        }
    `,
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
                dailyFee
                fixedFee
                createdAt
                customer {
                    _id
                    email
                }
                boat {
                    _id
                    model
                    yard
                    owner {
                        email
                    }
                    hasAdvertisement {
                        images
                        description
                        dailyFee
                        fixedFee
                    }
                    isDocked {
                        region
                        city
                        harbour
                    }
                    reviews {
                        creator {
                            _id
                        }
                        createdAt
                        body
                        rating
                        rental
                    }
                }
            }
        }
    `
};
exports.body_addAvatar = {
    operations: `{ "query": "mutation ($file: Upload!) { addAvatar(upload: $file) { addAvatarData { email avatar createdAt address { street city region postalCode } } addAvatarProblem }  }", "variables": { "file": null } }`,
    map: `{"0": ["variables.file"]}`,
};

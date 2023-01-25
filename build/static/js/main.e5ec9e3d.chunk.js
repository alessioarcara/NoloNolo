(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[3],[,,,,function(n,e,t){n.exports={"nav-bar":"NavigationBar_nav-bar__3bf-W",show:"NavigationBar_show__1SFtW",hide:"NavigationBar_hide__1B_f_",item:"NavigationBar_item__1ui1f",heart:"NavigationBar_heart__KX-_u","user-favorites-counter":"NavigationBar_user-favorites-counter__WeCZT",active:"NavigationBar_active__1yTZ1",bump:"NavigationBar_bump__2aal9"}},,,,,function(n,e,t){"use strict";t.d(e,"a",(function(){return m}));var a=t(7),r=t(3),i=t(0),o=t.n(i),s=t(11),c=t(25),u=t(15),d=function(n){Object(u.a)({TOGGLE_FAV:function(n,e){return n.userFavorites.some((function(n){return n._id===e._id}))?{userFavorites:n.userFavorites.filter((function(n){return n._id!==e._id}))}:{userFavorites:n.userFavorites.concat(e)}}},{userFavorites:n||[]})},l=t(1),b=o.a.createContext({token:"",isLoggedIn:!1,login:function(n){},logout:function(){}}),m=function(n){var e=Object(i.useState)(""),t=Object(r.a)(e,2),o=t[0],u=t[1],m=Object(c.a)().sendRequest,f=!!o,v=Object(i.useCallback)((function(n){m({body:s.body_favorites,token:n},(function(n){d(n.favorites.map((function(n){return Object(a.a)(Object(a.a)({},n),{},{advIsFavorite:!0})})))}))}),[m]),j=Object(i.useCallback)((function(n){u(n),v(n)}),[v]),p=Object(i.useCallback)((function(){u(null),m({body:s.invalidate,token:o},(function(){return d()}))}),[m,o]);Object(i.useEffect)((function(){m({body:s.body_refresh},(function(n){var e=n.refreshToken;u(e.token),v(e.token)}))}),[m,v]);var h={token:o,isLoggedIn:f,login:j,logout:p};return Object(l.jsx)(b.Provider,{value:h,children:n.children})};e.b=b},,function(n,e){e.body_login=function(n){return{query:"\n            mutation($userData: UserInput!) {\n                login(inputUser: $userData) {\n                    authData {\n                        userId\n                        token\n                    }\n                    authProblem\n                }\n            }\n        ",variables:{userData:{email:n.enteredEmail,password:n.enteredPassword}}}},e.body_signup=function(n){return{query:"\n            mutation($userData: UserInput!) {\n                createUser(inputUser: $userData) {\n                    authData {\n                        userId\n                        token\n                    }\n                    authProblem\n                }  \n            }\n        ",variables:{userData:{email:n.enteredEmail,password:n.enteredPassword}}}},e.body_changePassword=function(n){return{query:"\n            mutation($passwordData: ChangePasswordInput!) {\n                changePassword(inputChangePassword: $passwordData) {\n                    changePasswordData {\n                        email\n                        avatar\n                        createdAt\n                        address {\n                            street\n                            city\n                            region   \n                            postalCode\n                        }\n                    }\n                    changePasswordProblem\n                }  \n            }\n        ",variables:{passwordData:{oldPassword:n.oldPassword,newPassword:n.newPassword}}}},e.body_updateUser=function(n){return{query:"\n            mutation($userData: UpdateUserInput!) {\n                updateUser(inputUpdateUser: $userData) {\n                    updateUserData {\n                        email\n                        avatar\n                        createdAt\n                        address {\n                            street\n                            city\n                            region\n                            postalCode\n                        }\n                    }\n                    updateUserProblem\n                }  \n            }\n        ",variables:{userData:{street:n.street,city:n.city,region:n.region,postalCode:n.postalCode}}}},e.body_search=function(n){return{query:"\n            query($filter: LocationFilter!) {\n                listAllLocations(filter: $filter) {\n                    region\n                    city\n                }\n            }\n        ",variables:{filter:{contains:n}}}},e.body_advertisements=function(n){var e=n.city;return{query:"\n            query($filter: BoatFilter! $skip: Int $take: Int) {\n                advertisements(filter: $filter, skip: $skip, take: $take) {\n                    _id\n                    model\n                    totalCount\n                    maximumCapacity\n                    minPrice\n                    maxPrice\n                    hasAdvertisement {\n                        description\n                        images\n                        dailyFee\n                    }\n                    reviews {\n                        rating\n                    }\n                }\n            }\n        ",variables:{filter:{region:n.region,city:e,from:n.from,to:n.to,minCapacity:n.minCapacity,boatTypes:n.boatTypes,minPrice:n.minPrice,maxPrice:n.maxPrice},skip:n.skip,take:n.take}}},e.body_advertisement=function(n){return{query:"\n            query AdvertisementDetails($boatId: ID!) {\n                advertisement(boatId: $boatId) {\n                    model\n                    yard\n                    length\n                    maximumCapacity\n                    boatType\n                    owner {\n                        email\n                        avatar\n                    }\n                    hasAdvertisement {\n                        description\n                        images\n                        dailyFee\n                        fixedFee\n                    }\n                    isDocked {\n                        region\n                        city\n                        harbour\n                        coordinates \n                    }\n                    reviews {\n                        _id\n                        body\n                        rating\n                        createdAt\n                        creator {\n                            email\n                            avatar\n                        }\n                    }\n                }\n                boatRentals(boatId: $boatId) {\n                    from\n                    to\n                }\n            }        \n        ",variables:n}},e.body_addBoat=function(n){return{query:"\n            mutation($boatData: BoatInput!) {\n                addBoat(inputBoat: $boatData) {\n                    addBoatData {\n                        _id\n                        yard\n                        model\n                        length\n                        maximumCapacity\n                        boatType\n                        isDocked {\n                            harbour\n                            city\n                            region\n                            coordinates   \n                        }\n                    }\n                    addBoatProblem\n                }\n            }\n        ",variables:{boatData:{yard:n.yard,model:n.model,length:n.length,maximumCapacity:n.maximumCapacity,boatType:n.boatType,_id:n._id}}}},e.body_removeBoat=function(n){return{query:"\n            mutation($boatId: ID!) {\n                removeBoat(boatId: $boatId) {\n                    removedBoatId\n                    removeBoatProblem\n                }\n            }\n        ",variables:n}},e.body_insertBoatLocation=function(n){return{query:"\n            mutation($locationData: InsertBoatLocationInput!) {\n                insertBoatLocation(inputInsertBoatLocation: $locationData) {\n                    insertBoatLocationData {\n                        _id\n                        yard\n                        model\n                        length\n                        maximumCapacity\n                        boatType\n                        isDocked {\n                            region\n                            city\n                            harbour\n                            coordinates \n                        }\n                    }\n                    insertBoatLocationProblem\n                }\n            }\n        ",variables:{locationData:{boatId:n.boatId,isDocked:{harbour:n.harbour,city:n.city,region:n.region,latitude:n.latitude,longitude:n.longitude}}}}},e.body_publishAdvertisement=function(n){return{query:"\n            mutation($advertisementData: PublishAdvertisementInput!) {\n                publishAdvertisement(inputPublishAdvertisement: $advertisementData) {\n                    publishAdvertisementData {\n                        _id\n                    }\n                    publishAdvertisementProblem\n                }\n            }\n        ",variables:{advertisementData:{boatId:n.boatId,publishAdvertisement:{description:n.description,dailyFee:n.dailyFee,fixedFee:n.fixedFee}}}}},e.body_rentBoat=function(n){return{query:"\n            mutation($rentalData: RentBoatInput!) {\n                rentBoat(inputRentBoat: $rentalData) {\n                    rentBoatData {\n                        billNumber\n                        from\n                        to\n                        dailyFee\n                        fixedFee\n                        createdAt\n                        customer {\n                            email\n                        }\n                        boat {\n                            model\n                            yard\n                            owner {\n                                email\n                            }\n                            isDocked {\n                                region\n                                city\n                                harbour\n                                coordinates\n                            }\n                        }\n                    }\n                    rentBoatProblem\n                }\n            }\n        ",variables:{rentalData:{boatId:n.boatId,from:n.from,to:n.to}}}},e.body_updateRental=function(n){return{query:"\n            mutation($rentalData: UpdateRentalInput!) {\n                updateRental(inputUpdateRental: $rentalData) {\n                    updateRentalData {\n                        _id\n                        billNumber\n                        from\n                        to\n                        dailyFee\n                        fixedFee\n                        createdAt\n                        customer {\n                            _id\n                            email\n                        }\n                        boat {\n                            _id\n                            yard\n                            model\n                            length\n                            maximumCapacity\n                            boatType\n                            owner {\n                                email\n                            }\n                            hasAdvertisement {\n                                description\n                                images\n                                dailyFee\n                                fixedFee\n                            }\n                            isDocked {\n                                region\n                                city\n                                harbour\n                            }\n                            reviews {\n                                _id\n                                body\n                                rating\n                                rental\n                                createdAt\n                                creator {\n                                    _id\n                                    email\n                                    avatar\n                                }\n                            }\n                        }\n                    }\n                    updateRentalProblem\n                }\n            }\n        ",variables:{rentalData:{rentalId:n.rentalId,from:n.from,to:n.to}}}},e.body_backdateRental=function(n){return{query:"\n            mutation($rentalData: UpdateRentalInput!) {\n                backdateRental(inputUpdateRental: $rentalData) {\n                    backdateRentalData {\n                        _id\n                        from\n                        to\n                        boat {\n                            _id\n                            isDocked {\n                                city\n                            }\n                        }\n                        customer {\n                            email\n                        }\n                    }\n                    backdateRentalProblem\n                }\n            }\n        ",variables:{rentalData:{rentalId:n.rentalId,from:n.from,to:n.to}}}},e.body_recordBoatReturn=function(n){return{query:"\n            mutation($rentalId: ID!) {\n                recordBoatReturn(rentalId: $rentalId) {\n                    recordBoatReturnData {\n                        _id\n                        from\n                        to\n                        dailyFee\n                        fixedFee\n                        billNumber\n                        createdAt\n                        redelivery\n                        boat {\n                            _id\n                            model\n                            yard\n                            owner {\n                                email\n                            }\n                            isDocked {\n                                city\n                                region\n                                harbour\n                            }\n                            reviews {\n                                rating\n                                rental\n                                creator {\n                                    _id\n                                }\n                            }\n                        }\n                        customer {\n                            _id\n                            email\n                        }\n                    }\n                    recordBoatReturnProblem\n                }\n            }\n        ",variables:n}},e.body_boatRentals=function(n){return{query:"\n            query($boatId: ID!) {\n                boatRentals(boatId: $boatId) {\n                    from\n                    to\n                }\n            }\n        ",variables:n}},e.body_deleteRental=function(n){return{query:"\n            mutation($rentalId: ID!) {\n                deleteRental(rentalId: $rentalId) {\n                    deletedRentalId\n                    deleteRentalProblem\n                }\n            }\n        ",variables:n}},e.body_publishReview=function(n){return{query:"\n            mutation($reviewData: ReviewInput!) {\n                publishReview(inputReview: $reviewData) {\n                    publishReviewData {\n                        body\n                        rating\n                        rental\n                        createdAt\n                        creator {\n                            _id\n                        }\n                    }\n                    publishReviewProblem\n                }\n            }\n        ",variables:{reviewData:{rentalId:n.rentalId,body:n.body,rating:n.rating}}}},e.body_shipownerAdvertisements={query:"\n        query shipownerAdvertisements {\n            advertisementsByShipowner {\n                _id\n                yard\n                model\n                hasAdvertisement {\n                    images\n                    createdAt\n                    preferredBy {\n                        _id\n                    }\n                }\n                isDocked {\n                    region\n                    city\n                    harbour\n                }\n                reviews {\n                    _id\n                    rating\n                }\n            }\n            rentalsByShipowner {\n                _id\n                from\n                to\n                redelivery\n                dailyFee\n                fixedFee\n                billNumber\n                createdAt\n                boat {\n                    _id\n                    model\n                    yard\n                    owner {\n                        email\n                    }\n                    isDocked {\n                        city\n                        region\n                        harbour\n                    }\n                    reviews {\n                        rating\n                        rental\n                        creator {\n                            _id\n                        }\n                    }\n                }\n                customer {\n                    _id\n                    email\n                }\n            }\n        }\n    "},e.body_withdrawAdvertisement=function(n){return{query:"\n            mutation($boatId: ID!) {\n                withdrawAdvertisement(boatId: $boatId) {\n                    withdrawnAdvertisementId\n                    withdrawAdvertisementProblem\n                }\n            }\n        ",variables:n}},e.body_favorites={query:"\n        query {\n            favorites {\n                _id\n                model\n                maximumCapacity\n                hasAdvertisement {\n                    images\n                    description\n                    dailyFee\n                }\n                reviews {\n                    rating\n                }\n            }  \n        }\n    "},e.body_addFavorite=function(n){return{query:"\n            mutation($boatId: ID!) {\n                addFavorite(boatId: $boatId) {\n                    favoritesData {\n                        _id\n                        model\n                        maximumCapacity\n                        hasAdvertisement {\n                            images\n                            description\n                            dailyFee\n                        }\n                        reviews {\n                            rating\n                        }\n                    }\n                    favoritesProblem\n                }\n            }\n        ",variables:n}},e.body_removeFavorite=function(n){return{query:"\n            mutation($boatId: ID!) {\n                removeFavorite(boatId: $boatId) {\n                    favoritesData {\n                        _id\n                        model\n                        maximumCapacity\n                        hasAdvertisement {\n                            images\n                            description\n                            dailyFee\n                        }\n                        reviews {\n                            rating\n                        }\n                    }\n                    favoritesProblem\n                }\n            }\n        ",variables:n}},e.body_refresh={query:"\n        query {\n            refreshToken {\n                userId\n                token\n            }  \n        }\n    "},e.invalidate={query:"\n        mutation {\n            invalidateTokens\n        }\n    "},e.body_user={query:"\n        query {\n            user {\n                email\n                avatar\n                userType\n                createdAt\n                address {\n                    street\n                    city\n                    region\n                    postalCode\n                }\n            }\n        }\n    "},e.body_deleteUser={query:"\n        mutation {\n            deleteUser {\n                deletedUserId\n                deleteUserProblem\n            }\n        }\n    "},e.body_userBoats={query:"\n        query BoatDetails {\n            boatsByUser {\n                _id\n                yard\n                model\n                length\n                maximumCapacity\n                boatType\n                isDocked {\n                    harbour\n                    city\n                    region\n                    coordinates\n                }\n            }\n            user {\n                email\n            }\n            rentalsByShipowner {\n                from\n                to\n                boat {\n                    _id\n                }\n            }\n        }\n    "},e.body_rentals={query:"\n        query {\n            rentals {\n                _id\n                from\n                to\n                boat {\n                    _id\n                    isDocked {\n                        city\n                    }\n                }\n                customer {\n                    email\n                }\n            }\n        }\n    "},e.body_userRentals={query:"\n        query {\n            rentalsByUser {\n                _id\n                billNumber\n                from\n                to\n                redelivery\n                dailyFee\n                fixedFee\n                createdAt\n                customer {\n                    _id\n                    email\n                }\n                boat {\n                    _id\n                    model\n                    yard\n                    owner {\n                        email\n                    }\n                    hasAdvertisement {\n                        images\n                        description\n                        dailyFee\n                        fixedFee\n                    }\n                    isDocked {\n                        region\n                        city\n                        harbour\n                    }\n                    reviews {\n                        creator {\n                            _id\n                        }\n                        createdAt\n                        body\n                        rating\n                        rental\n                    }\n                }\n            }\n        }\n    "},e.body_addAvatar={operations:'{ "query": "mutation ($file: Upload!) { addAvatar(upload: $file) { addAvatarData { email avatar createdAt address { street city region postalCode } } addAvatarProblem }  }", "variables": { "file": null } }',map:'{"0": ["variables.file"]}'},e.body_addBoatImages={operations:function(n){return'{ "query": "mutation ($boatId: ID!, $files: [Upload!]!) { addBoatImages(boatId: $boatId, files: $files) { addBoatImagesData { _id } addBoatImagesProblem }  }", "variables": { "boatId": "'.concat(n,'", "files": [null, null, null] } }')},map:'{"0": ["variables.files.0"], "1": ["variables.files.1"], "2": ["variables.files.2"]}'}},,function(n,e,t){"use strict";var a=t(17),r=t.n(a),i=t(24),o=r.a.create({method:"post",withCredentials:!0,baseURL:i.i});e.a=o},,function(n,e,t){"use strict";t.d(e,"b",(function(){return u})),t.d(e,"a",(function(){return d}));var a=t(16),r=t(7),i=t(0),o={},s=[],c={},u=function(){var n=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],e=Object(i.useState)(o)[1],t=function(n,e){var t=c[n](o,e);o=Object(r.a)(Object(r.a)({},o),t);var i,u=Object(a.a)(s);try{for(u.s();!(i=u.n()).done;){(0,i.value)(o)}}catch(d){u.e(d)}finally{u.f()}};return Object(i.useEffect)((function(){return n&&s.push(e),function(){n&&(s=s.filter((function(n){return n!==e})))}}),[e,n]),[o,t]},d=function(n,e){e&&(o=Object(r.a)(Object(r.a)({},o),e)),c=Object(r.a)(Object(r.a)({},c),n)}},,,function(n,e,t){"use strict";var a=t(0),r=t.n(a),i=t(27),o=t(42),s=t.n(o),c=t(1),u=function(){return Object(c.jsx)("div",{className:s.a.fallback,children:Object(c.jsx)(i.a,{})})};e.a=r.a.memo(u)},,,,function(n,e,t){n.exports={spinner:"LoadingSpinner_spinner__2-3iP","lds-dual-ring":"LoadingSpinner_lds-dual-ring__kGMMn"}},function(n,e,t){n.exports={footer:"Footer_footer__1wbuT","grid-footer":"Footer_grid-footer__1Ou9F"}},function(n,e,t){"use strict";t.d(e,"i",(function(){return a})),t.d(e,"j",(function(){return r})),t.d(e,"o",(function(){return i})),t.d(e,"h",(function(){return o})),t.d(e,"g",(function(){return s})),t.d(e,"l",(function(){return c})),t.d(e,"a",(function(){return u})),t.d(e,"q",(function(){return d})),t.d(e,"k",(function(){return l})),t.d(e,"n",(function(){return b})),t.d(e,"m",(function(){return m})),t.d(e,"e",(function(){return f})),t.d(e,"p",(function(){return v})),t.d(e,"t",(function(){return j})),t.d(e,"c",(function(){return p})),t.d(e,"b",(function(){return h})),t.d(e,"d",(function(){return y})),t.d(e,"r",(function(){return O})),t.d(e,"s",(function(){return _})),t.d(e,"f",(function(){return g}));var a="http://localhost:3010/api",r="http://localhost:3010",i="https://nominatim.openstreetmap.org/search?format=json&",o="".concat(r,"/public/images/default-boat.png"),s="".concat(r,"/public/images/default.jpg"),c="MANAGE_BOATS",u="ADD_GUEST",d="REMOVE_GUEST",l="INITIAL_PRICE",b="MANAGE_MIN_PRICE",m="MANAGE_MAX_PRICE",f="CLEAR_FORM",v=4,j="SWITCH_SEARCH",p="CHANGE_START_DATE",h="CHANGE_END_DATE",y="CLEAR_DATES",O="SHOW_CONFIRM",_="SHOW_VISIBLE_CONTENT",g="CLEAR_RENTAL"},function(n,e,t){"use strict";var a=t(7),r=t(10),i=t.n(r),o=t(12),s=t(3),c=t(0),u=t(13),d=function(n,e){return"SEND"===e.type?{data:null,status:"pending",error:null}:"SUCCESS"===e.type?{data:e.responseData,status:"completed",error:null}:"ERROR"===e.type?{data:null,status:"completed",error:e.error}:n};e.a=function(){var n=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=Object(c.useReducer)(d,{status:n?"pending":null,data:null,error:null}),t=Object(s.a)(e,2),r=t[0],l=t[1],b=Object(c.useCallback)(function(){var n=Object(o.a)(i.a.mark((function n(e){var t,a,r,o=arguments;return i.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t=o.length>1&&void 0!==o[1]?o[1]:function(){},l({type:"SEND"}),n.prev=2,n.next=5,Object(u.a)({data:e.body,headers:{Authorization:"Bearer ".concat(e.token)}});case 5:return a=n.sent,n.next=8,a.data.data;case 8:if(r=n.sent,200===a.status||201===a.status){n.next=11;break}throw new Error(r.errors[0].message);case 11:l({type:"SUCCESS",responseData:t(r)}),n.next=17;break;case 14:n.prev=14,n.t0=n.catch(2),l({type:"ERROR",error:n.t0.message||"Something went wrong!"});case 17:case"end":return n.stop()}}),n,null,[[2,14]])})));return function(e){return n.apply(this,arguments)}}(),[]);return Object(a.a)({sendRequest:b},r)}},,function(n,e,t){"use strict";t(0);var a=t(22),r=t.n(a),i=t(1);e.a=function(){return Object(i.jsx)("div",{className:r.a.spinner,children:Object(i.jsx)("div",{className:r.a["lds-dual-ring"]})})}},function(n,e,t){"use strict";t.d(e,"a",(function(){return s}));var a=t(3),r=t(0),i=t(1),o=Object(r.createContext)({breakpoint:""}),s=function(n){var e=n.children,t=Object(r.useState)(window.innerWidth>768?"desktop":"smartphone"),s=Object(a.a)(t,2),c=s[0],u=s[1];Object(r.useEffect)((function(){var n=window.matchMedia("(min-width: 769px)"),e=function(n){n.matches?u("desktop"):u("smartphone")};return n.addEventListener("change",e,{passive:!0}),function(){return n.removeEventListener("change",e)}}),[]);var d={breakpoint:c};return Object(i.jsx)(o.Provider,{value:d,children:e})};e.b=o},,function(n,e,t){"use strict";var a=t(0),r=t.n(a),i=t(1),o=function(n){return Object(i.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"".concat(n.className," h-5 w-5"),viewBox:"0 0 20 20",fill:"currentColor",children:Object(i.jsx)("path",{fillRule:"evenodd",d:"M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z",clipRule:"evenodd"})})};e.a=r.a.memo(o)},,,,,,,,,function(n,e,t){"use strict";var a=t(0),r=t.n(a),i=t(1),o=function(){return Object(i.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor",children:Object(i.jsx)("path",{fillRule:"evenodd",d:"M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",clipRule:"evenodd"})})};e.a=r.a.memo(o)},function(n,e,t){"use strict";var a=t(1);e.a=function(){return Object(a.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:Object(a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1.2,d:"M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"})})}},function(n,e,t){"use strict";var a=t(3),r=t(0);e.a=function(n){var e=n.root,t=void 0===e?null:e,i=n.rootMargin,o=n.threshold,s=void 0===o?0:o,c=Object(r.useState)(!1),u=Object(a.a)(c,2),d=u[0],l=u[1],b=Object(r.useState)(null),m=Object(a.a)(b,2),f=m[0],v=m[1],j=Object(r.useRef)(null);return Object(r.useEffect)((function(){j.current=new IntersectionObserver((function(n){var e=Object(a.a)(n,1)[0];return l(e.isIntersecting)}),{root:t,rootMargin:i,threshold:s});var n=j.current;return f&&n.observe(f),function(){return n.disconnect()}}),[f,t,i,s]),[v,d]}},function(n,e,t){n.exports={fallback:"Fallback_fallback__1V5yV"}},,,,,function(n,e,t){},,,,,,,,,,,,,,,,,,,,,,function(n,e,t){"use strict";t.r(e);var a=t(0),r=t.n(a),i=t(26),o=t.n(i),s=(t(47),t(9)),c=t(2),u=t(3),d=t(18),l=t(1),b=function(n){var e=n.children,t=Object(a.useState)(!0),r=Object(u.a)(t,2),i=r[0],o=r[1],b=Object(a.useContext)(s.b).isLoggedIn,m=Object(a.useRef)(null);return Object(a.useEffect)((function(){return m.current=setTimeout((function(){return o(!1)}),500),function(){return clearTimeout(m.current)}}),[]),b?e:i?Object(l.jsx)(d.a,{}):b?e:Object(l.jsx)(c.a,{to:"/auth",replace:!0})},m=t(8),f=t(4),v=t.n(f),j=t(39),p=t(30),h=function(){return Object(l.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:Object(l.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1.4,d:"M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"})})},y=r.a.memo(h),O=t(15),_=Object(a.forwardRef)((function(n,e){var t=n.authenticated,r=n.isIntersecting,i=Object(a.useState)(!1),o=Object(u.a)(i,2),s=o[0],c=o[1],d=Object(O.b)()[0].userFavorites;Object(a.useEffect)((function(){if(d&&0!==d.length){c(!0);var n=setTimeout((function(){return c(!1)}),300);return function(){return clearTimeout(n)}}}),[d]);var b="".concat(v.a.item," ").concat(s?v.a.bump:"");return Object(l.jsx)("nav",{ref:e,children:Object(l.jsxs)("ul",{className:r?"".concat(v.a["nav-bar"]," ").concat(v.a.hide):"".concat(v.a["nav-bar"]," ").concat(v.a.show),children:[Object(l.jsx)("li",{children:Object(l.jsxs)(m.c,{to:"/",end:!0,className:function(n){return n.isActive?"".concat(v.a.active," ").concat(v.a.item):"".concat(v.a.item)},children:[Object(l.jsx)(j.a,{}),Object(l.jsx)("div",{children:"Esplora"})]})}),Object(l.jsx)("li",{children:Object(l.jsxs)(m.c,{style:{position:"relative"},to:"favorites",className:function(n){return n.isActive?"".concat(b," ").concat(v.a.active):"".concat(b)},children:[Object(l.jsx)(p.a,{className:v.a.heart}),d&&d.length>0&&Object(l.jsx)("div",{className:v.a["user-favorites-counter"],children:d.length}),Object(l.jsx)("div",{children:"Preferiti"})]})}),Object(l.jsx)("li",{children:Object(l.jsxs)(m.c,{to:"profile",className:function(n){return n.isActive?"".concat(v.a.active," ").concat(v.a.item):"".concat(v.a.item)},children:[Object(l.jsx)(y,{}),t?Object(l.jsx)("div",{children:"Account"}):Object(l.jsx)("div",{children:"Accedi"})]})})]})})})),g=r.a.memo(_),x=t(23),w=t.n(x),I=t(40),D=r.a.forwardRef((function(n,e){return Object(l.jsxs)("div",{className:w.a.footer,ref:e,children:[Object(l.jsx)(I.a,{}),Object(l.jsxs)("div",{className:w.a["grid-footer"],children:[Object(l.jsx)("div",{children:"Arcara Alessio"}),Object(l.jsx)("div",{children:"Carchesio Michael"}),Object(l.jsx)("div",{children:"Crimaldi Alessia"})]})]})})),A=r.a.memo(D),k=t(41),R=function(n){var e=n.authenticated,t=Object(a.useRef)(),r=Object(c.g)(),i=Object(a.useMemo)((function(){return{root:t.current}}),[t]),o=Object(k.a)(i),s=Object(u.a)(o,2),d=s[0],b=s[1];return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)(c.b,{}),Object(l.jsx)(g,{isIntersecting:b,ref:t,authenticated:e}),"/"===r.pathname&&Object(l.jsx)(A,{ref:d})]})},B=r.a.lazy((function(){return Promise.all([t.e(0),t.e(6)]).then(t.bind(null,311))})),C=r.a.lazy((function(){return t.e(10).then(t.bind(null,306))})),P=r.a.lazy((function(){return t.e(17).then(t.bind(null,316))})),$=r.a.lazy((function(){return t.e(16).then(t.bind(null,312))})),q=r.a.lazy((function(){return t.e(7).then(t.bind(null,310))})),F=r.a.lazy((function(){return Promise.all([t.e(0),t.e(2),t.e(5)]).then(t.bind(null,308))})),E=r.a.lazy((function(){return t.e(12).then(t.bind(null,313))})),N=r.a.lazy((function(){return Promise.all([t.e(0),t.e(1),t.e(15)]).then(t.bind(null,314))})),T=r.a.lazy((function(){return t.e(20).then(t.bind(null,307))})),S=r.a.lazy((function(){return Promise.all([t.e(1),t.e(18)]).then(t.bind(null,309))})),L=r.a.lazy((function(){return Promise.all([t.e(0),t.e(11)]).then(t.bind(null,315))}));var U=function(){var n=Object(a.useContext)(s.b).isLoggedIn;return Object(l.jsx)(a.Suspense,{fallback:Object(l.jsx)(d.a,{}),children:Object(l.jsxs)(c.e,{children:[Object(l.jsxs)(c.c,{element:Object(l.jsx)(R,{authenticated:n}),children:[Object(l.jsx)(c.c,{path:"/",element:Object(l.jsx)(B,{})}),!n&&Object(l.jsx)(c.c,{path:"auth",element:Object(l.jsx)(P,{})}),Object(l.jsx)(c.c,{path:"favorites",element:Object(l.jsx)(b,{children:Object(l.jsx)(C,{})})}),Object(l.jsx)(c.c,{path:"profile",element:Object(l.jsx)(b,{children:Object(l.jsx)($,{})})})]}),Object(l.jsx)(c.c,{path:"boats/*",element:Object(l.jsx)(q,{})}),Object(l.jsx)(c.c,{path:"boats/:boatId",element:Object(l.jsx)(F,{})}),Object(l.jsx)(c.c,{path:"profile/user-info",element:Object(l.jsx)(b,{children:Object(l.jsx)(E,{})})}),Object(l.jsx)(c.c,{path:"profile/rentals/*",element:Object(l.jsx)(b,{children:Object(l.jsx)(N,{})})}),Object(l.jsx)(c.c,{path:"become-shipowner/*",element:Object(l.jsx)(b,{children:Object(l.jsx)(T,{})})}),Object(l.jsx)(c.c,{path:"profile/your-advertisements",element:Object(l.jsx)(b,{children:Object(l.jsx)(S,{})})}),Object(l.jsx)(c.c,{path:"administration",element:Object(l.jsx)(b,{children:Object(l.jsx)(L,{})})}),Object(l.jsx)(c.c,{path:"*",element:Object(l.jsx)(c.a,{replace:!0,to:"/"})})]})})},M=t(28),z=t(10),G=t.n(z),W=t(12),H=t(17),V=t.n(H),J=t(11),X=t(13),Z=function(n){var e=n.children,t=Object(a.useContext)(s.b);return Object(a.useMemo)((function(){X.a.interceptors.response.use(function(){var n=Object(W.a)(G.a.mark((function n(e){return G.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.abrupt("return",e);case 1:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}(),function(){var n=Object(W.a)(G.a.mark((function n(e){var a,r,i,o;return G.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,e.response.data.errors[0].message;case 3:if(!n.sent.includes("Unauthenticated")){n.next=21;break}return n.prev=5,n.next=8,Object(X.a)({data:J.body_refresh});case 8:return a=n.sent,r=a.data.data.refreshToken,i=r.token,t.login(i),(o=e.config).headers.Authorization="Bearer "+i,n.abrupt("return",V.a.request(o));case 17:throw n.prev=17,n.t0=n.catch(5),t.logout(),new Error("'Invalid or expired refresh token.'");case 21:return n.abrupt("return",Promise.reject(e));case 24:throw n.prev=24,n.t1=n.catch(0),new Error("Il server non risponde. ");case 27:case"end":return n.stop()}}),n,null,[[0,24],[5,17]])})));return function(e){return n.apply(this,arguments)}}())}),[t]),e};o.a.render(Object(l.jsx)(m.a,{children:Object(l.jsx)(M.a,{children:Object(l.jsx)(s.a,{children:Object(l.jsx)(Z,{children:Object(l.jsx)(U,{})})})})}),document.getElementById("root"))}],[[69,4,8]]]);
//# sourceMappingURL=main.e5ec9e3d.chunk.js.map
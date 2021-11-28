import {Routes, Route, Navigate, useNavigationType} from "react-router-dom";
import RentalsHeader from "../components/Rentals/RentalsHeader/RentalsHeader";
import useHttp from "../hooks/use-http";
import {useCallback, useContext, useEffect, useMemo, useState} from "react";
import {body_userRentals} from "../helpers/httpConfig";
import AuthContext from "../store/auth-context";
import RentalsList from "../components/Rentals/RentalsList/RentalsList";
import {parseMutationResponse} from "../helpers/Utils/utils";

const filterRentals = rentals => {
    return {
        previous: rentals ?
            rentals.reduce((previousRentals, rental) => {
                if (rental.redelivery) {
                    previousRentals.push(rental.boat.reviews.some(review => review.rental === rental._id && review.creator._id === rental.customer._id) ?
                        {...rental, isReviewed: true} : {...rental, isReviewed: false})
                }
                return previousRentals
            }, []) : [],
        active: rentals ?
            rentals.filter(rental => new Date(rental.from) <= new Date() && new Date() <= new Date(rental.to)) : [],
        future: rentals ?
            rentals.filter(rental => new Date(rental.from) > new Date()) : []
    }
}

const RentalsPage = () => {
    const {token} = useContext(AuthContext)
    const navigationType = useNavigationType()
    const [rentals, setRentals] = useState([])
    const {sendRequest} = useHttp(true)

    const filteredRentals = useMemo(() => filterRentals(rentals), [rentals])

    const handleMutationRentals = useCallback((body, applyData) =>
            sendRequest({body, token}, parseMutationResponse(setRentals, applyData))
    , [sendRequest, token])

    useEffect(() => {
        sendRequest({
            body: body_userRentals,
            token
        }, resData => setRentals(resData.rentalsByUser))
    }, [sendRequest, token])

    return (
        <>
            <RentalsHeader/>
            <Routes>
                <Route path='previous' element={<RentalsList onMutateRentals={handleMutationRentals}
                                                             previousRentals={filteredRentals.previous} previous/>}/>
                <Route path='active' element={<RentalsList activeRentals={filteredRentals.active} active/>}/>
                <Route path='future' element={<RentalsList onMutateRentals={handleMutationRentals}
                                                           futureRentals={filteredRentals.future} future/>}/>
                <Route path='/' element={navigationType === "PUSH" ? <Navigate to='active'/> : <Navigate to='/profile'/>}/>
            </Routes>
        </>
    );
};

export default RentalsPage;
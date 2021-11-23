import Header from "../components/Rentals/Header/Header";
import {Routes, Route, Navigate} from "react-router-dom";
import useHttp from "../hooks/use-http";
import {useCallback, useContext, useEffect, useMemo, useState} from "react";
import {body_userRentals} from "../helpers/httpConfig";
import AuthContext from "../store/auth-context";
import RentalList from "../components/Rentals/RentalList/RentalList";
import {destructurePayload} from "../helpers/utils";

const filterRentals = rentals => {
    return {
        previous: rentals ?
            rentals.reduce((previousRentals, rental) => {
                if (!rental.redelivery) {
                    previousRentals.push(rental.boat.hasAdvertisement.reviews.some(review => review.rental === rental._id && review.creator._id === rental.customer._id) ?
                        { ...rental, isReviewed: true } : {...rental, isReviewed: false})
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
    const [rentals, setRentals] = useState([])
    const {sendRequest} = useHttp(true)

    const filteredRentals = useMemo(() => filterRentals(rentals), [rentals])

    const handleUpdateOrDeleteRentals = useCallback((body, applyData) => {
        sendRequest({body, token}, resData => {
            const payload = destructurePayload(resData)
            if (payload[0])
                setRentals(prevRentals => applyData(prevRentals, payload[0]))
            return payload[1]
        })
    }, [sendRequest, token])

    useEffect(() => {
        sendRequest({
            body: body_userRentals,
            token
        }, resData => setRentals(resData.rentalsByUser))
    }, [sendRequest, token])

    return (
        <>
            <Header/>
            <Routes>
                <Route path='previous' element={<RentalList onUpdateOrDeleteRentals={handleUpdateOrDeleteRentals} previousRentals={filteredRentals.previous} previous/>}/>
                <Route path='active' element={<RentalList activeRentals={filteredRentals.active} active/>}/>
                <Route path='future' element={<RentalList onUpdateOrDeleteRentals={handleUpdateOrDeleteRentals} futureRentals={filteredRentals.future} future/>}/>
                <Route path='/' element={<Navigate to='active'/>}/>
            </Routes>
        </>
    );
};

export default RentalsPage;

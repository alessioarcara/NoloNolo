import Header from "../components/Rentals/Header/Header";
import {Routes, Route, Navigate} from "react-router-dom";
import useHttp from "../hooks/use-http";
import {useContext, useEffect, useMemo} from "react";
import {body_userRentals} from "../helpers/httpConfig";
import AuthContext from "../store/auth-context";
import RentalCard from "../components/Rentals/RentalCard/RentalCard";
import BoatListLayout from "../components/UI/Layout/BoatListLayout/BoatListLayout";
import RentalList from "../components/Rentals/RentalList/RentalList";

const filterRentals = rentals => {
    return {
        previous: rentals ?
            rentals.filter(rental => !rental.redelivery) : [],
        active: rentals ?
            rentals.filter(rental => new Date(rental.from) <= new Date() && new Date() <= new Date(rental.to)) : [],
        future: rentals ?
            rentals.filter(rental => new Date(rental.from) > new Date()) : []
    }
}

const RentalsPage = () => {
    const {token} = useContext(AuthContext)
    const {data: rentals, sendRequest} = useHttp(true)

    const filteredRentals = useMemo(() =>
            filterRentals(rentals),
        [rentals])

    useEffect(() => {
        sendRequest({
            body: body_userRentals,
            token
        }, resData => resData.rentalsByUser)
    }, [sendRequest, token])

    console.log(filteredRentals)

    return (
        <>
            <Header/>
            <Routes>
                <Route path='previous' element={<RentalList previousRentals={filteredRentals.previous} previous/>}/>
                <Route path='active' element={<RentalList activeRentals={filteredRentals.active} active/>}/>
                <Route path='future' element={<RentalList futureRentals={filteredRentals.future} future/>}/>
                <Route path='/' element={<Navigate to='active'/>}/>
            </Routes>
        </>
    );
};

export default RentalsPage;
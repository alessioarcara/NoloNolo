import React, {useContext, Suspense} from "react";
import AuthContext from "./store/auth-context";
import {Routes, Route, Navigate} from "react-router-dom";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import NavigationLayout from "./components/UI/Layout/NavigationLayout/NavigationLayout";
import Fallback from "./components/UI/Fallback/Fallback";

const Home = React.lazy(() => import('./pages/Home'));
const Favorites = React.lazy(() => import('./pages/FavoritesPage'));
const Auth = React.lazy(() => import('./pages/AuthPage'))
const Profile = React.lazy(() => import('./pages/ProfilePage'));
const Results = React.lazy(() => import('./pages/ResultsPage'));
const Advertisement = React.lazy(() => import('./pages/AdvertisementPage'));
const UserDetails = React.lazy(() => import('./pages/UserDetailsPage'));
const Rentals = React.lazy(() => import('./pages/RentalsPage'));
const NewAdvertisement = React.lazy(() => import('./pages/NewAdvertisementPage'));
const AdvertisementAdministration = React.lazy(() => import('./pages/AdvertisementAdministrationPage'));
const WebsiteAdministration = React.lazy(() => import('./pages/WebsiteAdministrationPage'));

function App() {
    const {isLoggedIn} = useContext(AuthContext)

    return (
        <Suspense fallback={<Fallback/>}>
            <Routes>
                <Route element={<NavigationLayout authenticated={isLoggedIn}/>}>
                    <Route path='/' element={<Home/>}/>
                    {!isLoggedIn && <Route path='auth' element={<Auth/>}/>}
                    <Route path='favorites' element={<RequireAuth><Favorites/></RequireAuth>}/>
                    <Route path='profile' element={<RequireAuth><Profile/></RequireAuth>}/>
                </Route>
                <Route path='boats/*' element={<Results/>}/>
                <Route path='boats/:boatId' element={<Advertisement/>}/>
                <Route path='profile/user-info' element={<RequireAuth><UserDetails/></RequireAuth>}/>
                <Route path='profile/rentals/*' element={<RequireAuth><Rentals/></RequireAuth>}/>
                <Route path='become-shipowner/*' element={<RequireAuth><NewAdvertisement/></RequireAuth>}/>
                <Route path='profile/your-advertisements' element={<RequireAuth><AdvertisementAdministration/></RequireAuth>}/>
                <Route path='administration' element={<RequireAuth><WebsiteAdministration/></RequireAuth>}/>
                <Route path='*' element={<Navigate replace to="/"/>}/>
            </Routes>
        </Suspense>
    )
}

export default App

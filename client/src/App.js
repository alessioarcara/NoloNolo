import NavigationBar from "./components/Navigation/NavigationBar";
import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home";
import {useContext} from "react";
import AuthContext from "./store/auth-context";
import ProfilePage from "./pages/ProfilePage";
import RentalsPage from "./pages/RentalsPage";
import ResultsPage from "./pages/ResultsPage";
import FavoritesPage from "./pages/FavoritesPage";
import NewAdvertisementPage from "./pages/NewAdvertisementPage";
import AdvertisementPage from "./pages/AdvertisementPage";
import {Routes, Route, Navigate} from "react-router-dom";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import UserDetailsPage from "./pages/UserDetailsPage";

function App() {
    const {isLoggedIn} = useContext(AuthContext)

    return (
        <>
            <Routes>
                <Route path='/*' element={<Home/>}/>
                <Route path='favorites' element={<FavoritesPage/>}/>
                {!isLoggedIn && <Route path='auth' element={<AuthPage/>}/>}
                <Route path='profile' element={<RequireAuth><ProfilePage/></RequireAuth>}/>
                <Route path='profile/user-info' element={<RequireAuth><UserDetailsPage/></RequireAuth>}/>
                <Route path='profile/rentals/*' element={<RentalsPage/>}>
                    <Route path='active'/>
                    <Route path='future'/>
                    <Route path='previous'/>
                </Route>
                <Route path='boats/*' element={<ResultsPage/>}/>
                <Route path='boats/:boatId' element={<AdvertisementPage/>}/>
                <Route path='become-shipowner/*' element={<RequireAuth><NewAdvertisementPage/></RequireAuth>}/>
                <Route path='*' element={<Navigate replace to="/"/>}/>
            </Routes>
            <NavigationBar authenticated={isLoggedIn}/>
        </>
    );
}

export default App;

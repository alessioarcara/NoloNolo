import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home";
import {useContext} from "react";
import AuthContext from "./store/auth-context";
import ProfilePage from "./pages/ProfilePage";
import ResultsPage from "./pages/ResultsPage";
import FavoritesPage from "./pages/FavoritesPage";
import NewAdvertisementPage from "./pages/NewAdvertisementPage";
import AdvertisementPage from "./pages/AdvertisementPage";
import {Routes, Route, Navigate} from "react-router-dom";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import UserDetailsPage from "./pages/UserDetailsPage";
import NavigationLayout from "./components/UI/Layout/NavigationLayout/NavigationLayout";

function App() {
    const {isLoggedIn} = useContext(AuthContext)

    return (
        <Routes>
            <Route element={<NavigationLayout/>}>
                <Route path='/*' element={<Home/>}/>
                <Route path='favorites' element={<FavoritesPage/>}/>
                {!isLoggedIn && <Route path='auth' element={<AuthPage/>}/>}
                <Route path='profile' element={<RequireAuth><ProfilePage/></RequireAuth>}/>
            </Route>
            <Route path='profile/user-info' element={<RequireAuth><UserDetailsPage/></RequireAuth>}/>
            <Route path='boats/*' element={<ResultsPage/>}/>
            <Route path='boats/:boatId' element={<AdvertisementPage/>}/>
            <Route path='become-shipowner/*' element={<RequireAuth><NewAdvertisementPage/></RequireAuth>}/>
            <Route path='*' element={<Navigate replace to="/"/>}/>
        </Routes>
    );
}

export default App;

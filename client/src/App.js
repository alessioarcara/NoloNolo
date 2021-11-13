import NavigationBar from "./components/Navigation/NavigationBar";
import {Route, Switch, Redirect} from 'react-router-dom';
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

function App() {
    const {isLoggedIn} = useContext(AuthContext)
    // const [ref, visible] = useIntersectionObserver({threshold: 1.0})

    return (
        <>
            <Switch>
                <Route path='/' exact>
                    <Home/>
                </Route>
                <Route path='/preferiti'>
                    <FavoritesPage/>
                </Route>
                {!isLoggedIn &&
                <Route path='/auth'>
                    <AuthPage/>
                </Route>}
                <Route path='/profile'>
                    {isLoggedIn && <ProfilePage/>}
                    {!isLoggedIn && <Redirect to='/auth'/>}
                </Route>

                <Route path='/rentals/*' element={<RentalsPage/>}>
                    <Route path='active'/>
                    <Route path='future'/>
                    <Route path='previous'/>
                </Route>

                <Route path='/boats' exact>
                    <ResultsPage/>
                </Route>
                <Route path='/boats/:boatId'>
                    <AdvertisementPage/>
                </Route>
                <Route path='/become-shipowner'>
                    {isLoggedIn && <NewAdvertisementPage/>}
                    {!isLoggedIn && <Redirect to='/auth'/>}
                </Route>
                <Route path='*'>
                    <Redirect to='/'/>
                </Route>
            </Switch>

            {/*<div ref={ref}><Footer/></div>*/}
            {/*{!visible && <NavigationBar/>}*/}
            <NavigationBar authenticated={isLoggedIn}/>
        </>
    );
}

export default App;

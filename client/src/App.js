import NavigationBar from "./components/Navigation/NavigationBar";
import {Route, Switch, Redirect} from 'react-router-dom';
import AuthPage from "./pages/AuthPage";
import Header from "./components/Home/Header";
import Home from "./pages/Home";
import {useContext} from "react";
import AuthContext from "./store/auth-context";
import ProfilePage from "./pages/ProfilePage";

function App() {
    const {isLoggedIn} = useContext(AuthContext)

    return (
        <>
            <main>
                <Switch>
                    <Route path='/' exact>
                        <Home />
                        <p>AAA</p>
                        <p>AAA</p>
                        <p>AAA</p>
                        <p>AAA</p>
                        <p>AAA</p>
                        <p>AAA</p>
                        <p>AAA</p>
                        <p>AAA</p>
                        <p>AAA</p>
                        <p>AAA</p>
                        <p>AAA</p>
                        <p>AAA</p>
                        <p>AAA</p>
                        <p>AAA</p>
                        <p>AAA</p>
                        <p>AAA</p>
                        <p>AAA</p>
                        <p>AAA</p>
                        <p>AAA</p>
                        <p>AAA</p>
                        <p>AAA</p>
                        <p>AAA</p>
                        <p>AAA</p>
                        <p>AAA</p>
                        <p>AAA</p>
                        <p>AAA</p>
                        <p>AAA</p>
                    </Route>
                    <Route path='/preferiti'>
                        <p>Preferiti</p>
                    </Route>
                    {!isLoggedIn &&
                    <Route path='/auth'>
                        <AuthPage />
                    </Route>}
                    <Route path='/profile'>
                        {isLoggedIn && <ProfilePage/>}
                        {!isLoggedIn && <Redirect to='/auth'/>}
                    </Route>
                    <Route path='*'>
                        <Redirect to='/'/>
                    </Route>
                </Switch>
            </main>
            <NavigationBar/>
        </>
    );
}

export default App;

import NavigationBar from "./components/Navigation/NavigationBar";
import {Route, Switch, Redirect} from 'react-router-dom';
import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";

function App() {
    return (
        <>
            <main>
                <Switch>
                    <Route path='/' exact>
                        <Home/>
                    </Route>

                    <Route path='/preferiti'>
                        <p>Preferiti</p>
                    </Route>

                    <Route path='/auth'>
                        <AuthPage/>
                    </Route>

                    <Route path='/search'>
                        <SearchPage/>
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

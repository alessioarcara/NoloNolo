import NavigationBar from "./components/Navigation/NavigationBar";
import {Route, Switch, Redirect} from 'react-router-dom';
import AuthPage from "./pages/AuthPage";

function App() {
    return (
        <>
            <main>
                <Switch>
                    <Route path='/' exact>
                        <p>Home</p>
                    </Route>

                    <Route path='/preferiti'>
                        <p>Preferiti</p>
                    </Route>

                    <Route path='/auth'>
                        <AuthPage />
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

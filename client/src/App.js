import NavigationBar from "./components/Navigation/NavigationBar";
import {Route, Switch, Redirect} from 'react-router-dom';

function App() {
    return (
        <>
            <Switch>
                <Route path='/' exact>
                    <p>Home</p>
                </Route>

                <Route path='/preferiti'>
                    <p>Preferiti</p>
                </Route>

                <Route path='/accedi'>
                    <p>Accedi</p>
                </Route>

                <Route path='*'>
                    <Redirect to='/'/>
                </Route>
            </Switch>
            <NavigationBar/>
        </>
    );
}

export default App;

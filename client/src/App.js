import {Route, Switch} from 'react-router-dom';
import NavigationBar from "./components/Navigation/NavigationBar";
import AuthPage from "./pages/AuthPage";

function App() {
    return (
        <>
            <Switch>
                <Route path="/auth">
                    <AuthPage/>
                </Route>
            </Switch>
            <NavigationBar/>
        </>
    );
}

export default App;

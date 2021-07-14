import NavigationBar from "./components/Navigation/NavigationBar";
import {Route, Switch, Redirect} from 'react-router-dom';
import AuthPage from "./pages/AuthPage";
import Header from "./components/Header/Header";

function App() {
    return (
        <>
            <main>
                <Switch>
                    <Route path='/' exact>
                        <Header/>
                        <section id='back'>
                            <h1></h1>
                        </section>
                        <p>Ciao</p>
                        <p>Ciao</p>
                        <p>Ciao</p>
                        <p>Ciao</p>
                        <p>Ciao</p>
                        <p>Ciao</p>
                        <p>Ciao</p>
                        <p>Ciao</p>
                        <p>Ciao</p>
                        <p>Ciao</p>
                        <p>Ciao</p>
                        <p>Ciao</p>
                        <p>Ciao</p>
                        <p>Ciao</p>
                        <p>Ciao</p>
                        <p>Ciao</p>
                        <p>Ciao</p>
                        <p>Ciao</p>
                        <p>Ciao</p>
                        <p>Ciao</p>
                        <p>Ciao</p>
                        <p>Ciao</p>
                        <p>Ciao</p>
                        <p>Ciao</p>
                    </Route>

                    <Route path='/preferiti'>
                        <p>Preferiti</p>
                    </Route>

                    <Route path='/auth'>
                        <AuthPage/>
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

import './App.css';
import {Switch, Route, useHistory, useLocation} from 'react-router-dom'
import Main from './components/Main'
import Login from './components/Login'
import Registration from './components/Registration';
import {useEffect, useState} from 'react'
import axios from 'axios';

function App() {

    const [loaded, setLoaded] = useState(false)

    const load = () => {
        setLoaded(!loaded)
    }

    const history = useHistory()
    const location = useLocation()

    useEffect(()=>{
        axios.get("http://localhost:8000/api/checkLogin", {withCredentials: true})
            .then(res=> {
                console.log(res)
                if(location.pathname === '/') {
                    history.push('/pirates')
                }
            })
            .catch(err => {
                console.log(err)
                history.push('/register')
            })
    }, []);


    return (
        <div className="container mt-5">
            <Switch>
                <Route exact path ="/register">
                    <Registration load={load} />
                </Route>
                <Route exact path = "/login">
                    <Login load={load} />
                </Route>
                <Route>
                    <Main loaded={loaded} load={load} />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
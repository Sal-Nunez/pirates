import React, { useEffect, useState } from 'react'
import {Switch, Route, useHistory, useLocation, Link} from "react-router-dom"
import axios from 'axios';
import AllPirates from './AllPirates';
import Pirate from './Pirate';
import PirateForm from './PirateForm'

const Main = (props) => {
    const {load, loaded} = props;
    const history = useHistory()
    const location = useLocation()

    const deletePirate = (id) => {
        axios.delete(`http://localhost:8000/api/pirates/${id}`)
            .then( res => {
                load()
                history.push('/pirates')
            })
            .catch( err => console.error(err))
    }
    const [pirates, setPirates] = useState([])

    const logout = (e) => {
        e.preventDefault()
        axios.get('http://localhost:8000/api/logout', {withCredentials: true})
            .then( res => {
                console.log(res)
                history.push("/register")
            })
            .catch(err => console.log(err))
    }

    useEffect(()=>{
        axios.get("http://localhost:8000/api/pirates", {withCredentials: true})
        .then(res=> {
            setPirates(res.data)
            if(location.pathname === '/') {
                history.push('/pirates')
            }
        })
        .catch(err => {
            console.log(err)
            setPirates([])
            history.push('/register')
        })
    }, [loaded]);
    return (
        <div>
            <div className="d-flex justify-between">
            <h1 className="col-auto">Shiver Me Timbers, Welcome Pirate!</h1>
            <div className="col-auto">
                {location.pathname === '/pirates' ? null :<Link to="/pirates" className="btn btn-primary mt-2 me-3">Crew Board</Link>}
                <button onClick={logout} className="btn btn-danger mt-2">Logout</button>
            </div>
            </div>
            <Switch>
                <Route exact path = "/pirates">
                <AllPirates deletePirate={deletePirate} setLoaded={load} pirates = {pirates}  />
                </Route>
                <Route exact path = "/pirates/new">
                    <PirateForm setLoaded={load}/>
                </Route>
                <Route exact path = "/pirates/:id">
                    <Pirate deletePirate={deletePirate} />
                </Route>
                {/* <Route exact path = "/pirates/:id/edit">
                    <PirateForm setLoaded={load} />
                </Route> */}
            </Switch>
        </div>
    )
}

export default Main
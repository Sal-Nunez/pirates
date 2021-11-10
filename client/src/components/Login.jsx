import React, { useState } from 'react'
import axios from 'axios'
import { useHistory, Link } from 'react-router-dom'

const Login = (props) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailErr, setEmailErr] = useState("")
    const [passwordErr, setPasswordErr] = useState("")

    const history = useHistory()
    
    const onSubmitHandler = e => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/login', { email, password }, { withCredentials: true })
            .then(res => {
                console.log(res, "Test")
                if(res.data.error) {
                    if (res.data.error.email) setEmailErr(res.data.error.email)
                    else setEmailErr("")
                    if (res.data.error.password) setPasswordErr(res.data.error.password)
                    else setPasswordErr("")
                } else {
                    setEmailErr("")
                    props.load()
                    setEmail("")
                    setPassword("")
                    history.push('/dashboard')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className="d-flex justify-center">
            <div>
                <h1>Welcome to THE WEBSITE!</h1>
                <h1>Login</h1>
                <h3>Need to Register? <Link to="/register">Register</Link></h3>
                <form className="mt-5" onSubmit={onSubmitHandler}>
                    <div className="mb-3">
                        <label className="me-3">Email: </label><br />
                        <input onChange={e => setEmail(e.target.value)} type="text" />
                        <p className="text-danger">{emailErr}</p>
                    </div>
                    <div className="mb-3">
                        <label className="me-3">Password: </label><br />
                        <input onChange={e => setPassword(e.target.value)} type="text" />
                        <p className="text-danger">{passwordErr}</p>
                    </div>
                    <button className="btn btn-primary px-16 mt-3" >Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login

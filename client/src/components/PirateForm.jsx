import axios from 'axios'
import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'

const PirateForm = (props) => {

    const history = useHistory()
    const [name, setName] = useState("")
    const [profilePic, setProfilePic] = useState("")
    const [chests, setChests] = useState(0)
    const [catchPhrase, setCatchPhrase] = useState("")
    const [position, setPosition] = useState("Captain")
    const [errors, setErrors] = useState([])
    const [pegLeg, setPegLeg] = useState(true)
    const [eyePatch, setEyePatch] = useState(true)
    const [hookHand, setHookHand] = useState(true)

    const onSubmit = e => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/pirates', { name, profilePic, chests, catchPhrase, position, pegLeg, eyePatch, hookHand })
            .then(res => {
                props.setLoaded()
                setName("")
                setProfilePic("")
                history.push('/pirates')
            })
            .catch(err => {
                console.log(err)
                const errRes = err.response.data.errors
                const errArr = []
                for (const key of Object.keys(errRes)) errArr.push(errRes[key].message)
                setErrors(errArr)
            })
    }

    return (
        <form className="mt-5" onSubmit={onSubmit}>
            <div className="mb-3">
            <label className="me-3">Pirate Name: </label>
            <input onChange={ e => setName(e.target.value) } value={name} type="text" />
            </div>
            <div className="mb-3">
                <label className="me-3">Profile Pic URL: </label>
                <input value={profilePic} onChange={ e => setProfilePic(e.target.value) }type="text" />
            </div>
            <div className="mb-3">
                <label className="me-3"># of Treasure Chests: </label>
                <input value={chests} onChange={ e => setChests(e.target.value) } type="number" />
            </div>
            <div className="mb-3">
                <label className="me-3">Pirate Catch Phrase: </label>
                <input value={catchPhrase} onChange={ e => setCatchPhrase(e.target.value) } type="text" />
            </div>
            <div className="mb-3">
                <label className="me-3">Crew Position: </label>
                <select value={position} onChange={ e => setPosition(e.target.value) } type="text" >
                    <option value="Captain">Captain</option>
                    <option value="First Mate">First Mate</option>
                    <option value="Quarter Master">Quarter Master</option>
                    <option value="Boatswain">Boatswain</option>
                    <option value="Powder Monkey">Powder Monkey</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="me-3">Peg Leg: </label>
                <input value='pegLeg' name='pegLeg' checked={pegLeg ? 'checked' : null} onChange={ e => setPegLeg(e.target.checked) } type="checkbox" />
            </div>
            <div className="mb-3">
                <label className="me-3">Eye Patch: </label>
                <input value='eyePatch' name='eyePatch' checked={eyePatch ? 'checked' : null} onChange={ e => setEyePatch(e.target.checked) } type="checkbox" />
            </div>
            <div className="mb-3">
                <label className="me-3">Hook Hand: </label>
                <input value='hookHand' name='hookHand' checked={hookHand ? 'checked' : null} onChange={ e => setHookHand(e.target.checked) } type="checkbox" />
            </div>
            <button className="btn bg-gray-300 text-black" >Submit</button>
                {errors.map( err =>
                    <p className="text-danger">{err}</p>
                )}
        </form>
    )
}

export default PirateForm

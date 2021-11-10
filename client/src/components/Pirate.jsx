import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

const Pirate = (props) => {

    const [pirate, setPirate] = useState({});
    const {id} = useParams();
    
    useEffect(() => {
        axios.get(`http://localhost:8000/api/pirates/${id}`)
            .then(res => {
                setPirate(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="row">
            <div className="col-5">
                <p><img style={{width: '400px'}} src={pirate.profilePic} alt="" /></p>
                <h1>"{pirate.catchPhrase}"</h1>
            </div>
            <div className="col-5 border">
                <h1 className="text-center mb-5">About</h1>
                <p>Position: {pirate.position}</p>
                <p>Treasures: {pirate.chests}</p>
                <p>Peg Leg: {pirate.pegLeg ? 'Yes' : 'No'}</p>
                <p>Eye Patch: {pirate.eyePatch ? 'Yes' : 'No'}</p>
                <p>Hook Hand: {pirate.hookHand ? 'Yes' : 'No'}</p>
            </div>
        </div>
    )
}

export default Pirate

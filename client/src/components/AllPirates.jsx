import React from 'react'
import {Link} from 'react-router-dom'


const AllPirates = (props) => {

    // console.log(props.pirates)


    return (
        <div className="mt-5">
            <div className="row">
                <div className="col-4"></div>
                <h1 className="col-4">Pirate Crew</h1>
                <div className="col-4">
                    <Link to="/pirates/new" className="btn btn-primary mt-2">Add Pirate</Link>
                </div>
            </div>
            <h1>Pirate Crew</h1>
            <table className="table table-secondary">
                <thead>
                    <tr>
                        <th>Picture</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.pirates.map((pirate, i) => 
                    <tr key={i}>
                        <td> <img style={{width: '300px'}} src={pirate.profilePic} alt="" /></td>
                        <td>{pirate.name}</td>
                        <td>
                            <Link className="btn btn-primary me-3" to={`/pirates/${pirate._id}`}>View Pirate</Link>
                            <Link className="btn btn-warning me-3" to={`/pirates/${pirate._id}/edit`}>Edit</Link>
                            <button onClick={ e => props.deletePirate(pirate._id)} className="btn btn-danger">Walk the Plank</button>
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default AllPirates

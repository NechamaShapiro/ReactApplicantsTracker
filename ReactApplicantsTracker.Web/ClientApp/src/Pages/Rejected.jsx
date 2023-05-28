import React, { useState, useEffect } from "react";
import axios from 'axios';

const Rejected = () => {
    const [rejectedApplicants, setRejectedApplicants] = useState([]);
    const [viewNotes, setViewNotes] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getRejectedApplicants = async () => {
            const { data } = await axios.get('/api/applications/getrejected');
            setRejectedApplicants(data);
        }

        getRejectedApplicants();
        setIsLoading(false);
    }, []);

    const onToggleClick = () => {
        setViewNotes(!viewNotes);
    }

    return (
        <div className="container" style={{ marginTop: '100px', maxWidth: "80%" }} >
            <h1>Rejected</h1>
            <button className="btn btn-success" onClick={onToggleClick}>Toggle Notes</button>
            <div className="d-flex justify-content-center">
                {isLoading ? (
                    <img src="Loading_icon.gif"></img>
                ) : (
                    <table className="table table-hover table-bordered" >
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Phone Number</th>
                                <th>Email</th>
                                {viewNotes ? <th>Notes</th> : null}
                            </tr>
                        </thead>
                        <tbody>
                            {rejectedApplicants.map(r => (
                                <tr key={r.id} style={{ backgroundColor: "#f8f9fa", borderRadius: "15px" }}>
                                    <td>{r.firstName}</td>
                                    <td>{r.lastName}</td>
                                    <td>{r.phoneNumber}</td>
                                    <td>
                                        <a href="https://gmail.com" target='blank'>{r.email}</a>
                                    </td>
                                    {viewNotes ? <td>{r.notes}</td> : null}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}

export default Rejected;
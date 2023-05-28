import React, { useState, useEffect } from "react";
import axios from 'axios';

const Accepted = () => {
    const [acceptedApplicants, setAcceptedApplicants] = useState([]);
    const [viewNotes, setViewNotes] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getAcceptedApplicants = async () => {
            const { data } = await axios.get('/api/applications/getaccepted');
            setAcceptedApplicants(data);
        }

        getAcceptedApplicants();
        setIsLoading(false);
    }, []);

    const onToggleClick = () => {
        setViewNotes(!viewNotes);
    }

    return (
        <div className="container" style={{ marginTop: '100px', maxWidth: "80%" }}>
            <h1>Accepted</h1>
            <button className="btn btn-success" onClick={onToggleClick}>Toggle Notes</button>
            <div className="d-flex justify-content-center">
                {isLoading ? (
                    <img src="Loading_icon.gif"></img>
                ) : (
                    <table className="table table-hover table-bordered">
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
                            {acceptedApplicants.map(a => (
                                <tr key={a.id} style={{ backgroundColor: "#f8f9fa", borderRadius: "15px" }}>
                                    <td>{a.firstName}</td>
                                    <td>{a.lastName}</td>
                                    <td>{a.phoneNumber}</td>
                                    <td>
                                        <a href="https://gmail.com" target='blank'>{a.email}</a>
                                    </td>
                                    {viewNotes ? <td>{a.notes}</td> : null}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

            </div>
        </div>
    )
}

export default Accepted;
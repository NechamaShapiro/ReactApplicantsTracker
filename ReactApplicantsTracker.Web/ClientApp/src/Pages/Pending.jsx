import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const Pending = () => {

    const [pendingApplicants, setPendingApplicants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getPendingApplicants = async () => {
            const { data } = await axios.get('/api/applications/getpending');
            setPendingApplicants(data);
        }

        getPendingApplicants();
        setIsLoading(false);
        
    }, []);

    return (
        <div className="d-flex justify-content-center" style={{ marginTop: '100px' }}>
            {isLoading ? (
                <img src="Loading_icon.gif"></img>
            ) : (
                <table className="table table-hover table-bordered" style={{ maxWidth: "80%" }}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingApplicants.map(p => (
                            <tr key={p.id} style={{ backgroundColor: "#f8f9fa", borderRadius: "15px" }}>
                                <td>
                                    <Link to={`/details/${p.id}`}>
                                        View Details
                                    </Link>
                                </td>
                                <td>{p.firstName}</td>
                                <td>{p.lastName}</td>
                                <td>{p.phoneNumber}</td>
                                <td>
                                    <a href="https://gmail.com" target='blank'>{p.email}</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

        </div>
    )
}

export default Pending;
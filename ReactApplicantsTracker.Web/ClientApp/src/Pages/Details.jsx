import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useStatusCount } from '../StatusCountContext';

const Details = () => {

    const { id } = useParams();
    const [applicant, setApplicant] = useState({});
    const { refreshStatusCount } = useStatusCount();

    useEffect(() => {
        const getApplicant = async () => {
            const { data } = await axios.get(`/api/applications/get?id=${id}`);
            setApplicant(data);
        }

        getApplicant();
    }, []);

    const onAcceptClick = async (e) => {
        let newStatus = e.target.value;
        setApplicant({
            firstName: applicant.firstName,
            lastName: applicant.lastName,
            email: applicant.email,
            phoneNumber: applicant.phoneNumber,
            applicationStatus: newStatus,
            notes: applicant.notes
        });
        refreshStatusCount();
        await axios.post('/api/applications/accept', applicant);
    }
    const onRejectClick = async (e) => {
        let newStatus = e.target.value;
        setApplicant({
            firstName: applicant.firstName,
            lastName: applicant.lastName,
            email: applicant.email,
            phoneNumber: applicant.phoneNumber,
            applicationStatus: newStatus,
            notes: applicant.notes
        });
        refreshStatusCount();
        await axios.post('/api/applications/reject', applicant);
    }

    return (
        <div className="container" style={{ marginTop: '80px' }}>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card card-body bg-light">
                        <h4>Name: {applicant.firstName} {applicant.lastName}</h4>
                        <h4>Email: <a href="https://gmail.com" target='blank'>{applicant.email}</a></h4>
                        <h4>Phone Number: {applicant.phoneNumber}</h4>
                        <h4>Status: {applicant.applicationStatus}</h4>
                        <h4>Notes:</h4>
                        <h5>
                            {applicant.notes}
                        </h5>
                        {applicant.applicationStatus == 'Pending' && 
                        <div>
                            <button className="btn btn-success" value='Accepted' onClick={onAcceptClick}>Accept</button>
                            <button className="btn btn-danger" value='Rejected' onClick={onRejectClick}>Reject</button>
                        </div>
                         }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details;
import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useStatusCount } from '../StatusCountContext';

const AddApplicant = () => {
    const navigate = useNavigate();
    const { refreshStatusCount } = useStatusCount();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [notes, setNotes] = useState('');

    const onSubmitClick = async () => {
        await axios.post('/api/applications/add', {
            firstName,
            lastName,
            email,
            phoneNumber,
            notes,
            applicationStatus: 'Pending'
        });
        refreshStatusCount();
        navigate('/');
    }

    return (
        <div className="row" style={{ marginTop: '100px' }}>
            <div className="col-md-6 offset-md-3">
                <div className="card card-body bg-light">
                    <h4>Add Applicant</h4>
                    {/* <form> */}
                    <input type="text" name="firstName" onChange={e => setFirstName(e.target.value)} placeholder="First Name" className="form-control"></input>
                    <br></br>
                    <input type="text" name="lastName" onChange={e => setLastName(e.target.value)} placeholder="Last Name" className="form-control"></input>
                    <br></br>
                    <input type="text" name="email" onChange={e => setEmail(e.target.value)} placeholder="Email" className="form-control"></input>
                    <br></br>
                    <input type="text" name="phoneNumber" onChange={e => setPhoneNumber(e.target.value)} placeholder="Phone Number" className="form-control"></input>
                    <br></br>
                    <textarea rows={5} className="form-control" name="notes" onChange={e => setNotes(e.target.value)}></textarea>
                    <br></br>
                    <button className="btn btn-primary" onClick={onSubmitClick}>Submit</button>
                    {/* </form> */}
                </div>
            </div>
        </div>
    )
}

export default AddApplicant;
import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';

const StatusCountContext = createContext();

const StatusCountContextComponent = ({ children }) => {
    const [pendingCount, setPendingCount] = useState(0);
    const [acceptedCount, setAcceptedCount] = useState(0);
    const [rejectedCount, setRejectedCount] = useState(0);

    const refreshStatusCount = async () => {
        const pending = await axios.get('/api/applications/getcount?status=Pending')
        setPendingCount(pending.data);
        const accepted = await axios.get('/api/applications/getcount?status=Accepted')
        setAcceptedCount(accepted.data);
        const rejected = await axios.get('/api/applications/getcount?status=Rejected')
        setRejectedCount(rejected.data);
    }

    useEffect(() => {
        refreshStatusCount();
    }, [])
    return (
        <StatusCountContext.Provider value={{ pendingCount, acceptedCount, rejectedCount, refreshStatusCount }}>
            {children}
        </StatusCountContext.Provider>)
}

const useStatusCount = () => {
    return useContext(StatusCountContext);
}

export { StatusCountContextComponent, useStatusCount };

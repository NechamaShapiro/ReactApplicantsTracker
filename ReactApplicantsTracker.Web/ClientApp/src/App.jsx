import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { StatusCountContextComponent } from './StatusCountContext';

import Layout from './Layout';
import Home from './Pages/Home';
import Pending from './Pages/Pending';
import Accepted from './Pages/Accepted';
import Rejected from './Pages/Rejected';
import AddApplicant from './Pages/AddApplicant';
import Details from './Pages/Details';

const App = () => {
    return (
        <StatusCountContextComponent>
            <Layout>
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/addapplicant' element={<AddApplicant />} />
                    <Route exact path='/pending' element={<Pending />} />
                    <Route exact path='/details/:id' element={<Details />} />
                    <Route exact path='/accepted' element={<Accepted />} />
                    <Route exact path='/rejected' element={<Rejected />} />
                </Routes>
            </Layout>
        </StatusCountContextComponent>
    )
}

export default App;
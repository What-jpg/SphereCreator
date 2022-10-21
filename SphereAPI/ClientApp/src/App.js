import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { SphereGenerator } from './components/SphereGenerator';
import NotFound from './components/NotFound'

import 'bootstrap/dist/css/bootstrap.min.css';
//import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Router>
                <Layout>
                    <Routes>
                        <Route exact path='/' element={<Home />} />
                        <Route path='/sphere-generator' element={<SphereGenerator />} />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </Layout>
            </Router>
        );
    }
}

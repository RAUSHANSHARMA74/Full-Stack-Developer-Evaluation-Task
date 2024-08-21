import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from '../Pages/Home/Home';
import Navbar from '../Pages/Navbar/Navbar';
import About from '../Pages/About/About';

export default function Routers() {
    return (
        <div className="routes">
            <Navbar />
            <Routes>
                <Route index element={<Home />} />
                <Route path="/about" element={<About />} />
                {/* <Route path="/addrequest" element={<Addcard />} /> */}
                {/* <Route path="*" element={<Nopage />} /> */}
            </Routes>
        </div>
    )
}

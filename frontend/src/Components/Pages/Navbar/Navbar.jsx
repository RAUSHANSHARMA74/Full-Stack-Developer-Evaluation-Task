import React from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <div className="navbar">
            <Link to="/" className='link'>
                <span>Rapid<span>Q</span>uest</span>
            </Link>
        </div>
    )
}

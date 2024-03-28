import React from 'react';
import logo from './icon.png';
import search from './search.png';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#FEDB00', padding: '15px 70px' }}>
            <img src={logo} alt="Logo" className="navbar-brand" style={{ height: '50px', width: '48px', height: 'auto', marginRight: '20px' }} />
            <form className="form-inline my-2 my-lg-0 ml-auto" style={{ display: 'flex', alignItems: 'center', position: 'relative', marginRight: '70px' }}>
                <div className="input-group" style={{ borderRadius: '50px', height: '40px' }}>
                    <select className="custom-select" style={{ color: 'black', borderRadius: '50px 0 0 50px', backgroundColor: '#EBEEF6', padding: '8px 16px', height: '100%', border: 'none' }}>
                        <option value="">All Categories</option>
                        {/* Add your category options here */}
                    </select>
                    <input type="text" className="form-control" placeholder="Search" style={{ borderRadius: '0 50px 50px 0', border: 'none', height: '100%', paddingRight: '60px', zIndex: '1' }} />
                </div>
                <button className="btn" type="button" style={{ position: 'absolute', right: '0', top: '-6px', bottom: '0', width: '60px', borderRadius: '0 50px 50px 0', background: 'none', border: 'none', outline: 'none', zIndex: '2' }} onFocus={(e) => e.target.blur()}> 
                    <img src={search} alt="Search" style={{ width: '47px', height: '38.5px', marginTop: '1px' }} />
                </button>
            </form>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto" >
                    <li className="nav-item active">
                        <a className="nav-link" href="#" style={{ color: '#000000' }}>Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#" style={{ color: '#000000' }}>Dashboard</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#" style={{ color: '#000000' }}>Post Ads</a>
                    </li>
                    <li className="nav-item" >
                        <a className="nav-link" href="#" style={{ color: '#000000' }}>Academic Services</a>
                    </li>
                    <li className="nav-item" >
                        <a className="nav-link" href="#" style={{ color: '#000000' }}>Messages</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;

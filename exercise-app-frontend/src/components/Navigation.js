import React from 'react';
import { Link } from 'react-router-dom'; 

function Navigation () {
    return (
    <nav>
        <Link className='link' to='/'>Home Page</Link>
        <Link className='link' to='../add-exercise'>Add an Exercise</Link>
    </nav>
    );
}
    
export default Navigation;
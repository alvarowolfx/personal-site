import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <Link className="appbar-logo mui--align-middle mui--appbar-height mui--appbar-line-height" to="/">
            <span className="appbar-logo--light">A</span>
            <span className="appbar-logo--black">V</span>
        </Link>
    )
}

export default Logo;

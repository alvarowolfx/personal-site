import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'muicss/lib/react/container';
import Appbar from 'muicss/lib/react/appbar';
import Logo from './Logo';

const Navbar = ({ location }) => {
    let currentPath = location.pathname;
    /*
    <li className={currentPath == "projects"
        ? "mui--is-active"
        : null}>
        <Link to="talks">
            Projects
        </Link>
    </li>
    */
    return (
        <header>
            <Appbar className="nav-appbar mui--z1">
                <Container>
                    <Logo />
                    <ul className="mui-tabs__bar appbar-tabs mui--appbar-height mui--appbar-line-height">
                        <li className={currentPath == "/talks" ? "mui--is-active" : null}>
                            <Link to="talks">Talks</Link>
                        </li>
                        <li>
                            <a href="https://medium.com/iot-bootcamp" target="_blank">
                                Blog
                            </a>
                        </li>
                    </ul>
                </Container>
            </Appbar>
        </header>
    );
}

export default Navbar;

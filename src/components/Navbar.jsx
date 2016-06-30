import React from 'react';
import Link from 'react-router/lib/Link';
import Container from 'muicss/lib/react/container';
import Appbar from 'muicss/lib/react/appbar';
import Logo from './Logo';

export default class Navbar extends React.Component {

    render() {
        let currentPath = this.props.routes[this.props.routes.length - 1].path || 'index';
        return (
            <header>
                <Appbar className="nav-appbar mui--z1">
                    <Container>
                        <Logo/>
                        <ul className="mui-tabs__bar appbar-tabs mui--appbar-height mui--appbar-line-height">
                            <li className={currentPath == "talks"
                                ? "mui--is-active"
                                : null}>
                                <Link to="talks">
                                    Talks
                                </Link>
                            </li>
                            <li className={currentPath == "projects"
                                ? "mui--is-active"
                                : null}>
                                <Link to="talks">
                                    Projects
                                </Link>
                            </li>
                            <li className={currentPath == "blog"
                                ? "mui--is-active"
                                : null}>
                                <Link to="blog">
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </Container>
                </Appbar>
            </header>
        );
    }
}

import React from 'react';
import Link from 'react-router/lib/Link';

export default class Logo extends React.Component {
    render() {
        return (
            <Link className="appbar-logo mui--align-middle mui--appbar-height mui--appbar-line-height" to="/">
                <span className="appbar-logo--light">A</span>
                <span className="appbar-logo--black">V</span>
            </Link>
        )
    }
}

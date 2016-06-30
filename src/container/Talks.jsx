import React from 'react';
import Divider from 'muicss/lib/react/divider';

export default class Talks extends React.Component {
    render() {
        return (
            <div>
                <div className="mui--text-center">
                    <div className="mui--text-title">
                        Talks
                    </div>
                </div>
                <Divider/>
            </div>
        );
    }
}

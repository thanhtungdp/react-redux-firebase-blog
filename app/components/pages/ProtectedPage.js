import React, {Component} from 'react';

export default class ProtectedPage extends Component {
    constructor() {
        super(...arguments)
    }

    render() {
        return (
            <div>
                <h4>Protected page</h4>
            </div>
        )
    }
}
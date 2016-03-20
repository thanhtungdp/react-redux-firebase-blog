import React from 'react';
import {render} from 'react-dom';

class Hello extends React.Component {
    render() {
        var place = "Thanh Tung";
        return (
            <h1>Hello baby ád World {place}</h1>
        );
    }
}

render(<Hello/>, document.getElementById('root'))
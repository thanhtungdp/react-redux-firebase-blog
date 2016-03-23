import React from 'react';
import {render} from 'react-dom';

class Hello extends React.Component {
    render() {
        var place = "Thanh Tung";
        return (
            <h1>Hello cục cưng baby asdsdsa dsadas ád  haha đỳ ghế không cần ấy lun, kk kk Sgut  tải lại trang rùi World {place}</h1>
        );
    }
}

render(<Hello/>, document.getElementById('root'))
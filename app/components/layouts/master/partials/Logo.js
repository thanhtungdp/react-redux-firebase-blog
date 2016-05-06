import React, {Component, PropTypes} from 'react';

export default class Logo extends Component {
    componentDidMount(){
        setInterval(()=>{
            let underline = document.getElementById('logo-underline');
            if(!underline.classList.contains('hide')){
                underline.classList.add('hide');
            }
            else{
                underline.classList.remove('hide');
            }
        }, 800)
    }
    render() {
        return (
            <div>
                <img src="images/logo.png" alt="Home Page" />
                <span className="underline" id="logo-underline">_</span>
            </div>
        )
    }
}

Logo.propTypes = {

}
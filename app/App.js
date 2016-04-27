import React,{Component} from 'react';
import {render} from 'react-dom';
import Root from './redux/Root';
import '../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss'
import './stylesheets/style.css'
import './test/Test.js';


render(<Root/>, document.getElementById('root'))
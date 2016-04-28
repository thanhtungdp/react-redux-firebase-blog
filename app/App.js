/* React */
import React,{Component} from 'react';
import {render} from 'react-dom';

/* Root provider from redux */
import Root from './redux/Root';

/* Stylesheet */
import '../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss'
import './stylesheets/style.scss'

/* Test */
import './test/Test.js';


render(<Root/>, document.getElementById('root'))
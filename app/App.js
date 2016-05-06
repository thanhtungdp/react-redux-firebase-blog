/* React */
import React,{Component} from 'react';
import {render} from 'react-dom';

/* Root provider from redux */
import Root from './redux/Root';

/* Stylesheet */
import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import 'font-awesome/scss/font-awesome.scss';
import 'simple-line-icons/scss/simple-line-icons.scss';
import 'animate.css/animate.css';
import './stylesheets/style.scss';

/* Test */
import './test/Test.js';

render(<Root/>, document.getElementById('root'))
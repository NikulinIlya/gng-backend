import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import Home from './modules/home/index';

class Index extends Component {
    render() {
        return (
            <h1>hello</h1>
        );
    }
}
ReactDOM.render(<Index/>, document.getElementById('index'));

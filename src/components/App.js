/**
 * Created by dhshen on 2017/8/6.
 */
import React, { Component } from 'react';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <h2>React-Redux入门示例</h2>
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App;
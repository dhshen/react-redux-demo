/**
 * Created by dhshen on 2017/8/6.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { increase,decrease } from '../actions/Actions';
import './App.css';

class OptPanel extends Component {
    render() {
        const { increase,decrease } = this.props;
        return (
            <div className="opt">
                <a href="javascript:void(0)" onClick={increase}>加</a>
                <a href="javascript:void(0)" onClick={decrease}>减</a>
            </div>
        );
    }
}


const OptContainer = connect(
    null,
    {increase,decrease}
)(OptPanel);

export default OptContainer;
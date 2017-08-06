/**
 * Created by dhshen on 2017/8/6.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

class ShowPanel extends Component {
    render() {
        const {number} = this.props;
        return (
            <div className="Show">
                {number}
            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        number: state.number
    }
}


const ShowContainer = connect(
    mapStateToProps
)(ShowPanel);

export default ShowContainer;
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {increase,decrease} from './actions/actions';
import reducer from './reducers/reducer';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import './index.css';

const Store = createStore(reducer);
const rootEl = document.getElementById('root')
const render = () => ReactDOM.render(
    <App
        number = {Store.getState().number}
        increase = {()=>Store.dispatch(increase())}
        decrease = {()=>Store.dispatch(decrease())}
    />,
    rootEl
)

render()
Store.subscribe(()=>{
    console.log(Store.getState());
    render();
})

registerServiceWorker()












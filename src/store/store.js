/**
 * Created by dhshen on 2017/8/6.
 */
import Reducer from '../reducers/Reducer';
import { createStore } from 'redux';

const store = createStore(Reducer);

export default store;
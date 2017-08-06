/**
 * Created by dhshen on 2017/8/6.
 */

const Reducer = (state = {number:0},action)=>{
    const number = state.number;
    switch(action.type){
        case 'INCREASE':
            return {number: number+1};break;
        case 'DECREASE':
            return {number: number-1};break;
        default:
            return state;
    }
}

export default Reducer;

const reducer = (state={number:0},action)=>{
    let number = state.number;
    switch(action.type){

        case 'INCREASE':
            return {number:number+1};
        case 'DECREASE':
            return {number:number-1};
        default:
            return state;
    }
}

export default reducer;
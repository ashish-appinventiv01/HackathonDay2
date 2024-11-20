import {  ADD } from "./action";


const Reducer = (state = initialState, action) => {
    const initialState ={
        values : 0
    }
    switch (action.type) {
        case ADD:
            return {
                ...state, 
                values:  action.payload
              };
        default:
            return state;
    }
};

export default Reducer;

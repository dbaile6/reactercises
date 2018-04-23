import { createSup } from '../actions/sups';
import { createSupReducer } from './sups';

const initialState = {
  sups: []
};

let reducers = {
    [createSup]: createSupReducer,
};

let fallbackReducer = state => state;

let reducer = (oldState = initialState, action) => {
    let babyReducer = reducers[action.type];
    babyReducer = babyReducer || fallbackReducer;
    let newState = babyReducer(oldState, action);
    return newState;
};

export default reducer;
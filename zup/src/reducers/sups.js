export let createSupReducer = (state, action) => ({
    ...state,
    sups: state.sups.concat([action.payload])
});
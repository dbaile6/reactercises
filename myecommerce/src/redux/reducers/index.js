import { removeFromCart, addToCart, handleUsername, handlePassword, handleEmail, createAccount, setToken, setProducts } from '../actions/index';
import cartWithQuantity from '../../lib/index';
import { createUser } from '../../ajax/index';

const initialState = {
    categories: ['gear', 'tickets', 'sports'],
    cart: [],
    token: null,
    typedUsername: '',
    typedPassword: '',
    typedEmail: '',
    products: []
};

const reducerRoutes = {
    [addToCart]: (state, action) => ({
        ...state, cart: cartWithQuantity(state.cart, action.payload)
    }),
    [handleUsername]: (state, action) => ({
        ...state, typedUsername: action.payload
    }),
    [handlePassword]: (state, action) => ({
        ...state, typedPassword: action.payload
    }),
    [handleEmail]: (state, action) => ({
        ...state, typedEmail: action.payload
    }),
    [createAccount]: (state, action) => {
        let user = { email: state.typedEmail, password: state.typedPassword, username: state.typedUsername };
        console.log(user);
        createUser(user)
        return { ...state }
    },
    [setToken]: (state, action) => ({
        ...state, token: action.payload
    }),
    [setProducts]: (state, action) => ({
        ...state, products: action.payload
    }),
    default: (state, action) => state
}

const rootReducer = (state = initialState, action) => {
    let reducerAction = reducerRoutes[action.type] || reducerRoutes.default
    return reducerAction(state, action)
}


export default rootReducer;

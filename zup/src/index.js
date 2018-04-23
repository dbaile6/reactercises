import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';

import { createSup } from './actions/sups';
import reducer from './reducers';

let store = createStore(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

let ScreenDumb = ({ sups, dispatch }) =>
  <div>
    <p>{sups.toString()}</p>
    <button onClick={() => dispatch(createSup('Hi there!'))}>
      Click Me!
    </button>
  </div>

let mapStateToProps = (state) => {
  return { sups: state.sups };
};

let mapDispatchToProps = (dispatch) => {
  return { dispatch: dispatch };
};

let Screen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScreenDumb);

let ui =
  <Provider store={store}>
    <Screen />
  </Provider>

ReactDOM.render(ui, document.getElementById('root'));
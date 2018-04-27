export const addToCart = product =>
  ({
    type: addToCart.toString(),
    payload: product
  });

  export const removeFromCart = product =>
    ({
      type: removeFromCart.toString(),
      payload: product
    });

  export const handleUsername = text =>
    ({
      type: handleUsername.toString(),
      payload: text
    })
  export const handlePassword = text =>
    ({
      type: handlePassword.toString(),
      payload: text
    })
  export const handleEmail = text =>
    ({
      type: handleEmail.toString(),
      payload: text
    })
  export const createAccount = user =>
    ({
      type: createAccount.toString(),
      payload: user
    })
  export const setToken = token =>
    ({
      type: setToken.toString(),
      payload: token
    })
  export const setProducts = products =>
    ({
      type: setProducts.toString(),
      payload: products
    })

addToCart.toString = () => 'ADD_TO_CART';
removeFromCart.toString = () => 'REMOVE_FROM_CART';
handleUsername.toString = () => 'HANDLE_USERNAME';
handlePassword.toString = () => 'HANDLE_PASSWORD';
handleEmail.toString = () => 'HANDLE_EMAIL';
createAccount.toString = () => 'CREATE_ACCOUNT';
setToken.toString = () => 'SET_TOKEN';
setProducts.toString = () => 'SET_PRODUCTS';
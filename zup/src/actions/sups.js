const CREATE_SUP = 'CREATE_SUP';
export let createSup = (sup) => ({ type: CREATE_SUP, payload: sup });
createSup.toString = () => CREATE_SUP;
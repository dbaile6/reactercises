const registration = 'https://etsetera.herokuapp.com/auth/local/register';

export let makeUser = () => {
    fetch(registration, {
        body: JSON.stringify(user),
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        }
    });
}
const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
        .then((response) => {
            // console.log(response)
            try {
                if (response.status !== 400) {
                    return response.json();
                }
            } catch (e) {
                return (e)
            }
        })
        .then((res) => {
            return res;
        })
        .catch((err) => console.log(err));
};

export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
        .then((response => response.json()))
        .then((data) => {
            // console.log(data);
            if (data.token) {
                localStorage.setItem('token', data.token);
                return data;
            }
        })
        .catch(err => console.log(err))
};

export const validate = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`

        }
        // body: JSON.stringify({ password, email })
    })
        .then((response) => {
            try {
                if ((response.status !== 400) || (response.status !== 401)) {
                    return response.json();
                }
            } catch (e) {
                return (e)
            }
        })
        .then((res) => {
            console.log(res)

            return res;
        })
        .catch((err) => console.log(err));
}; 
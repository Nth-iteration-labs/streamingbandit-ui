import {AUTH_CHECK, AUTH_ERROR, AUTH_LOGIN, AUTH_LOGOUT} from 'admin-on-rest';

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

export default (type, params) => {

    if (type === AUTH_LOGIN) {
        const {username, password, serverurlparam} = params;
        return fetch(
            serverurlparam + "/login",
            {
                method: 'POST',
                body: JSON.stringify({username, password}),
                headers: new Headers({'Content-Type': 'application/json'}),
                credentials: 'include',
            },
        ).then((response) => {
            if (response.status === 401) {
                return Promise.reject("Wrong username or password")
            }
            if (response.status < 200 || response.status >= 300) {
                throw new Error(response.statusText);
            }
            if (!response.ok) {
                localStorage.removeItem('username');
                localStorage.removeItem('token');
                return Promise.reject(response.statusText)
            } else {
                localStorage.setItem('username', username);
                localStorage.setItem('token', btoa(username + ":" + password));
                window.location.reload(false); // yet another hack to make login in work well
                return Promise.resolve()

            }
        })
            .catch((e) => {
                return Promise.reject(e)
            })
    }

    if (type === AUTH_LOGOUT) {
        deleteAllCookies();
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        return Promise.resolve();
    }

    if (type === AUTH_ERROR) {
        const {status} = params;
        if (status === 401 || status === 403) {
            localStorage.removeItem('username');
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    }

    if (type === AUTH_CHECK) {
        return localStorage.getItem('username') ? Promise.resolve() : Promise.reject();
    }
    return Promise.reject('Unknown method');
};
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'admin-on-rest';

export default (type, params) => {

    if (type === AUTH_LOGIN) {
        const { username, password, serverurlparam } = params;
        return fetch(
					serverurlparam +"/login", 
					{
						method: 'POST',  
						body: JSON.stringify({ username, password }),
						headers: new Headers({ 'Content-Type': 'application/json' }),
						credentials: 'include',
					},
			)
			.then((response) => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                if (!response.ok) {
					localStorage.removeItem('username');
					localStorage.removeItem('token');
					return Promise.reject(response.statusText)
                } else {
					localStorage.setItem('username', username)
					localStorage.setItem('token', btoa(username + ":" + password));
					//document.location.href="/" // this hack seems not needed anymore because of hack in fetch?
					return Promise.resolve()

				}
            })
		    .catch((e) => {
				return Promise.reject(e.statusText)
		    })
    }

    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('username');
		localStorage.removeItem('token');
        return Promise.resolve();
    }

    if (type === AUTH_ERROR) {
        const { status } = params;
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
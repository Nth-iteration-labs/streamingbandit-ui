// in src/authClient.js
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'admin-on-rest';

export default (type, params) => {

    if (type === AUTH_LOGIN) {

        const { username, password } = params;

		const request = new Request('http://strm.mnds.org:7070/login', {method: 'POST',  
			body: 'username='+username+'&password='+password,
			headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
		});

        return fetch(request)
			.then((response) => {
                if (!response.ok) {
					localStorage.removeItem('username');
					return Promise.reject(response.statusText)
                } else {
					localStorage.setItem('username', username)
					return Promise.resolve()
				}
            })
		    .catch((e) => {
				//console.log("caught")
		    })
    }

    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('username');
        return Promise.resolve();
    }

    if (type === AUTH_ERROR) {
        const { status } = params;
        if (status === 401 || status === 403) {
            localStorage.removeItem('username');
            return Promise.reject();
        }
        return Promise.resolve();
    }

    if (type === AUTH_CHECK) {
        return localStorage.getItem('username') ? Promise.resolve() : Promise.reject();
    }
    return Promise.reject('Unknown method');
};
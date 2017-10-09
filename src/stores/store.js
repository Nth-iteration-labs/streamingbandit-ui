import {easyStore} from 'react-easy-state'
import {easyParams} from 'react-easy-params'

const store = easyStore({
    serverurl: "http://localhost:8080",
    setServerUrl(ev) {
        this.serverurl = ev
    }
});

easyParams(store, {
    serverurl: ['storage', 'history']
});


export default store
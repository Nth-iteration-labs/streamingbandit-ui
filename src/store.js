import { easyStore } from 'react-easy-state'
import { easyParams } from 'react-easy-params'

/*fetch('./config.json')
  .then((res) => res.json())
  .then((data) => {
    console.log('data:', store);
})*/

const store = easyStore({
  serverurl: "http://localhost:8080"
})

// store.name will be two-way synchronized with the url
// and a new history item will be added whenever store.name changes

easyParams(store, {
  serverurl: ['history', 'storage']
})

export default store
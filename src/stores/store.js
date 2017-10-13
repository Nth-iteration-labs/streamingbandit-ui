import { easyStore } from "react-easy-state";
import { easyParams } from "react-easy-params";

let config = window.sb_config;
let setserverurl =
  typeof config.set_server_url === "undefined"
    ? "http://localhost:8080"
    : config.set_server_url;

const store = easyStore({
  serverurl: setserverurl,
  setServerUrl(ev) {
    this.serverurl = ev;
  }
});

easyParams(store, {
  serverurl: ["storage", "history"]
});

export default store;

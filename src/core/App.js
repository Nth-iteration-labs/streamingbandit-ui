import React, { Component } from "react";
import themeReducer from "../reducers/themeReducer";
import { Admin, Delete, Resource } from "admin-on-rest";
import { ExpCreate, ExpEdit, ExpList } from "../pages/Experiment";
import Login from "./Login";
import Dashboard from "../components/Dashboard";
import authClient from "../network/authClient";
import Menu from "./Menu";
import customRoutes from "../routes/routes";
import Layout from "./Layout";

import streamingBanditClient from "../network/streamingBanditClient";
import { easyComp } from "react-easy-state";
import store from "../stores/store";

import hotkey from "react-shortcut-key";

const controlSave = e => {
  e.preventDefault();
  e.stopPropagation();
  let button = document.querySelector('button[type="submit"]');
  if (button) {
    if (button.innerHTML.indexOf("Save") !== -1) {
      button.click();
    }
  }
  return false;
};

const keymap = {
  "ctrl+s": controlSave
};

class App extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      defaultExps: []
    };
  }

  render(props) {
    return (
      <Admin
        authClient={authClient}
        menu={Menu}
        dashboard={Dashboard}
        title="StreamingBandit"
        appLayout={Layout}
        customRoutes={customRoutes}
        customReducers={{ theme: themeReducer }}
        loginPage={Login}
        restClient={streamingBanditClient(store.serverurl)}
      >
        <Resource
          {...props}
          serverurl={store.serverurl}
          name="Experiments"
          list={ExpList}
          edit={ExpEdit}
          create={ExpCreate}
          remove={Delete}
        />
      </Admin>
    );
  }
}

const AppCtrlSave = hotkey(keymap)(App);

export default easyComp(AppCtrlSave);

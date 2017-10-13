import React, { Component } from "react";
import withWidth from "material-ui/utils/withWidth";
import { AppBarMobile } from "admin-on-rest";

import Welcome from "../core/Welcome";

import { easyComp } from "react-easy-state";
import store from "../stores/store";

const styles = {
  welcome: { marginBottom: "2em" },
  flex: { display: "flex" },
  leftCol: { flex: 1, marginRight: "1em" },
  rightCol: { flex: 1, marginLeft: "1em" },
  singleCol: { marginTop: "2em" }
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      defaultExps: []
    };
  }

  render() {
    const { width } = this.props;
    return (
      <div>
        {width === 1 && <AppBarMobile title="StreamingBandit" />}
        <Welcome style={styles.welcome} localClientUrl={store.serverurl} />
      </div>
    );
  }
}

export default withWidth()(easyComp(Dashboard));

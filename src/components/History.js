import React, { Component } from "react";
import DownloadButton from "./DownloadButton";
import withWidth from "material-ui/utils/withWidth";
import { easyComp } from "react-easy-state";
import store from "../stores/store";

const styles = {
  welcome: { marginBottom: "2em" },
  flex: { display: "flex" },
  leftCol: { flex: 1, marginRight: "1em" },
  rightCol: { flex: 1, marginLeft: "1em" },
  singleCol: { marginBottom: "2em" },
  pre: {
    marginLeft: "1em",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    fontSize: 12
  },
  card: { paddingBottom: "3em" },
  card2: { padding: "2em", paddingTop: "0" },
  icon: {
    float: "right",
    width: 64,
    height: 64,
    padding: 16,
    color: "#4caf50"
  },
  button: {
    marginBottom: "1em",
    float: "left",
    clear: "both",
    width: 300,
    height: 40
  },
  buttonMargin: { marginLeft: "1em", marginBottom: "2em", marginTop: "2em" },
  paddingLast: { display: "block", position: "relative", height: 270 }
};

class History extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.makeFileLog = this.makeFileLog.bind(this);
    this.makeFileRewardLog = this.makeFileRewardLog.bind(this);
    this.makeFileActionLog = this.makeFileActionLog.bind(this);
  }

  fetchAndDo(url, file, callback) {
    fetch(url, {
      method: "GET",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "include"
    })
      .then(response =>
        response.text().then(text => ({
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
          body: text
        }))
      )
      .then(({ status, statusText, headers, body }) => {
        let json;
        try {
          json = JSON.parse(body);
          const callbackargument = {
            mime: "application/json",
            filename: file,
            contents: JSON.stringify(json, null, 2)
          };
          callback(callbackargument);
        } catch (e) {
          //
        }
        if (status < 200 || status >= 300) {
          return Promise.reject(statusText);
        }
      });
  }

  makeFileLog(done) {
    this.fetchAndDo(
      store.serverurl + "/stats/" + this.props.record.id + "/log",
      "log_" + Date.now() + ".json",
      done
    );
  }

  makeFileActionLog(done) {
    this.fetchAndDo(
      store.serverurl + "/stats/" + this.props.record.id + "/actionlog",
      "actionlog_" + Date.now() + ".json",
      done
    );
  }

  makeFileRewardLog(done) {
    this.fetchAndDo(
      store.serverurl + "/stats/" + this.props.record.id + "/rewardlog",
      "rewardlog_" + Date.now() + ".json",
      done
    );
  }

  makeFileSimulationLog(done) {
    this.fetchAndDo(
      store.serverurl + "/stats/" + this.props.record.id + "/simulationlog",
      "simulationlog_" + Date.now() + ".json",
      done
    );
  }

  render() {
    return (
      <div style={styles.paddingLast}>
        <br />
        <br />
        <DownloadButton
          style={styles.button}
          generateTitle="Generate and download main log"
          loadingTitle="Generating log file..."
          downloadTitle="Click to download log"
          async={true}
          genFile={this.makeFileLog}
        />
        <DownloadButton
          style={styles.button}
          generateTitle="Generate and download action log"
          loadingTitle="Generating action log file..."
          downloadTitle="Click to download action log"
          async={true}
          genFile={this.makeFileActionLog}
        />
        <DownloadButton
          style={styles.button}
          generateTitle="Generate and download reward log"
          loadingTitle="Generating reward log file..."
          downloadTitle="Click to download reward log"
          async={true}
          genFile={this.makeFileRewardLog}
        />
        <DownloadButton
          style={styles.button}
          generateTitle="Generate and download simulation log"
          loadingTitle="Generating simulation log file..."
          downloadTitle="Click to download simulation log"
          async={true}
          genFile={this.makeFileSimulationLog}
        />
      </div>
    );
  }
}

export default withWidth()(easyComp(History));

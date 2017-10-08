import React, {Component} from 'react';
import DownloadButton from './DownloadButton'
import withWidth from 'material-ui/utils/withWidth'
import {easyComp} from 'react-easy-state'
import store from '../stores/store'

const styles = {
    welcome: {marginBottom: '2em'},
    flex: {display: 'flex'},
    leftCol: {flex: 1, marginRight: '1em'},
    rightCol: {flex: 1, marginLeft: '1em'},
    singleCol: {marginBottom: '2em'},
    pre: {marginLeft: '1em', whiteSpace: "pre-wrap", wordWrap: "break-word", fontSize: 12},
    card: { paddingBottom: "3em"},
    card2: { padding: "2em", paddingTop: "0"},
    icon: {float: 'right', width: 64, height: 64, padding: 16, color: '#4caf50'},
    button: {
        "border": "10px none", "boxSizing": "border-box", "display": "inline-block",
        "fontFamily": "Roboto,sans-serif", "cursor": "pointer", "textDecoration": "none",
        "padding": "0px", "outline": "medium none", "fontSize": "inherit", "fontWeight": "inherit",
        "position": "relative", "zIndex": "1", "lineHeight": "36px", "borderRadius": "2px", "transition": "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms",
        "backgroundColor": "rgb(0, 188, 212)", "textAlign": "center", marginBottom: "1em", float: "left", clear: "both", width: 300, color: "#ffffff", height: 40
    },
	buttonMargin: { marginLeft:'1em', marginBottom: '2em', marginTop: '2em' },
	paddingLast: { display: "block", position: "relative", height: 220 }
};

class History extends Component {

    state = {};

    constructor(props) {
        super(props);
        this.props = props;
        this.makeFileLog = this.makeFileLog.bind(this);
        this.makeFileRewardLog = this.makeFileRewardLog.bind(this);
        this.makeFileActionLog = this.makeFileActionLog.bind(this);
    }


	handleClick(e) {
        fetch(
            store.serverurl + "/exp/" + this.props.record.id + "/resetexperiment?key=" + this.props.record.key,
            {
                method: 'GET',
                headers: new Headers({'Content-Type': 'application/json'}),
                credentials: 'include',
            },
        ).then(response => response.text().then(text => ({

            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            body: text,

        }))).then(({status, statusText, headers, body}) => {
            let json;
            try {
                json = JSON.parse(body);
                this.setState({defaultExps: Object.values(json)})
			    this.fetchAndShow(store.serverurl + "/stats/" + this.props.record.id + "/currenttheta", "currentThetaString");
                this.fetchAndShow(store.serverurl + "/stats/" + this.props.record.id + "/hourlytheta", "hourlyThetaString");
                this.fetchAndShow(store.serverurl + "/stats/" + this.props.record.id + "/summary", "summary")
            } catch (e) {
                // not json
            }
            if (status < 200 || status >= 300) {
                return Promise.reject(statusText, status);
            }
        });
    }

    fetchAndDo(url, file, callback) {
        fetch(
            url,
            {
                method: 'GET',
                headers: new Headers({'Content-Type': 'application/json'}),
                credentials: 'include',
            },
        ).then(response => response.text().then(text => ({
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            body: text,

        }))).then(({status, statusText, headers, body}) => {
            let json;
            try {
                json = JSON.parse(body);
                callback({
                    mime: 'application/json',
                    filename: file,
                    contents: JSON.stringify(json, null, 2),
                })

            } catch (e) {
                //
            }
            if (status < 200 || status >= 300) {
                return Promise.reject(statusText, status);
            }
        });
    }

    makeFileLog(done) {
        this.fetchAndDo(store.serverurl + "/stats/" + this.props.record.id + "/log", "log.json", done)
    }

    makeFileActionLog(done) {
        this.fetchAndDo(store.serverurl + "/stats/" + this.props.record.id + "/actionlog", "actionlog.json", done)
    }

    makeFileRewardLog(done) {
        this.fetchAndDo(store.serverurl + "/stats/" + this.props.record.id + "/rewardlog", "rewardlog.json", done)
    }

    render() {
        return (
            <div style={styles.paddingLast}>
								<br/><br/>
                                <DownloadButton style={styles.button}
                                                generateTitle="Generate and download log"
                                                loadingTitle="Generating log file..."
                                                downloadTitle="Click to download log"
                                                async={true}
                                                genFile={this.makeFileLog}/>
                                <DownloadButton style={styles.button}
                                                generateTitle="Generate and download action log"
                                                loadingTitle="Generating action log file..."
                                                downloadTitle="Click to download action log"
                                                async={true}
                                                genFile={this.makeFileActionLog}/>
                                <DownloadButton style={styles.button}
                                                generateTitle="Generate and download reward log"
                                                loadingTitle="Generating reward log file..."
                                                downloadTitle="Click to download reward log"
                                                async={true}
                                                genFile={this.makeFileRewardLog}/>
            </div>
        );
    }
}

export default withWidth()(easyComp(History));
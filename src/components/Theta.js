import React, {Component} from 'react';
import withWidth from 'material-ui/utils/withWidth'
import {Card, CardTitle} from 'material-ui/Card'
import {easyComp} from 'react-easy-state'
import store from '../stores/store'
import RaisedButton from 'material-ui/RaisedButton'


const styles = {
    welcome: {marginBottom: '2em'},
    flex: {display: 'flex'},
    leftCol: {flex: 1, marginRight: '1em'},
    rightCol: {flex: 1, marginLeft: '1em'},
    singleCol: {marginBottom: '2em'},
    pre: {marginLeft: '1em', whiteSpace: "pre-wrap", wordWrap: "break-word", fontSize: 12},
    card: { flex: 1, marginLeft: '1em', paddingBottom: "3em"},
    card2: { flex: 1, marginLeft: '1em', padding: "2em", paddingTop: "0"},
    icon: {float: 'right', width: 64, height: 64, padding: 16, color: '#4caf50'},
    button: {
        "border": "10px none", "boxSizing": "border-box", "display": "inline-block",
        "fontFamily": "Roboto,sans-serif", "cursor": "pointer", "textDecoration": "none",
        "padding": "0px", "outline": "medium none", "fontSize": "inherit", "fontWeight": "inherit",
        "position": "relative", "zIndex": "1", "height": "36px", "lineHeight": "36px",
        "width": "100%", "borderRadius": "2px", "transition": "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms",
        "backgroundColor": "rgb(0, 188, 212)", "textAlign": "center", marginBottom: "1em"
    },
	buttonMargin: { marginLeft:'1em', marginBottom: '2em', marginTop: '2em' }

};

class Theta extends Component {

    state = {};

    constructor(props) {
        super(props);
        this.props = props;
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

    fetchAndShow(url, id) {
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
                var str = JSON.stringify(json, undefined, 4);
                //this.setState({currentThetaString: str})
                document.getElementById(id).innerHTML = str;
            } catch (e) {
                //
            }
            if (status < 200 || status >= 300) {
                return Promise.reject(statusText, status);
            }
        });
    }

    componentDidMount() {

        this.fetchAndShow(store.serverurl + "/stats/" + this.props.record.id + "/currenttheta", "currentThetaString");
        this.fetchAndShow(store.serverurl + "/stats/" + this.props.record.id + "/hourlytheta", "hourlyThetaString");
        this.fetchAndShow(store.serverurl + "/stats/" + this.props.record.id + "/summary", "summary")

    }

    render() {
        const {
            currentThetaString,
            hourlyThetaString,
            summary,
        } = this.state;
        return (
            <div>
			    <RaisedButton onClick={this.handleClick.bind(this)} label="Reset theta of Experiment" value="set" style={styles.buttonMargin} primary={true} />
                <div style={styles.flex}>
                    <div style={styles.leftCol}>
                        <div style={styles.singleCol}>
                            <Card style={styles.card}>
                                <CardTitle title="Current Theta" subtitle=""/>
								
                                <pre id="currentThetaString" style={styles.pre}> {currentThetaString} </pre>
                            </Card>
                        </div>
                        <div style={styles.singleCol}>
                            <Card style={styles.card}>
                                <CardTitle title="Hourly Theta" subtitle=""/>
                                <pre id="hourlyThetaString" style={styles.pre}> {hourlyThetaString} </pre>
                            </Card>
                        </div>
                    </div>

                    <div style={styles.rightCol}>

                        <div style={styles.singleCol}>
                            <Card style={styles.card}>
                                <CardTitle title="Summary" subtitle=""/>
                                <pre id="summary" style={styles.pre}> {summary} </pre>
                            </Card>
                        </div>

                    </div>

                </div>
            </div>
        );
    }
}

export default withWidth()(easyComp(Theta));
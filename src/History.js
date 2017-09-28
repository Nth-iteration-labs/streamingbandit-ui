import React, { Component } from 'react';
import DownloadButton from './DownloadButton'
import withWidth from 'material-ui/utils/withWidth';
//import { sbConfig } from './config'
import { Card, CardTitle } from 'material-ui/Card';;


const styles = {
    welcome: { marginBottom: '2em' },
    flex: { display: 'flex' },
    leftCol: { flex: 1, marginRight: '1em' },
    rightCol: { flex: 1, marginLeft: '1em' },
    singleCol: { marginBottom: '2em' },
	pre:  { marginLeft: '1em', whiteSpace: "pre-wrap", wordWrap:"break-word", fontSize:12},
    card: { borderLeft: 'solid 4px #4caf50', flex: 1, marginLeft: '1em', paddingBottom:"3em"},
	card2: { borderLeft: 'solid 4px #4caf50', flex: 1, marginLeft: '1em', padding:"2em", paddingTop:"0"},
    icon: { float: 'right', width: 64, height: 64, padding: 16, color: '#4caf50' },
	button:{ "border":"10px none","boxSizing":"border-box","display":"inline-block",
		"fontFamily":"Roboto,sans-serif","cursor":"pointer","textDecoration":"none",
		"padding":"0px","outline":"medium none","fontSize":"inherit","fontWeight":"inherit",
		"position":"relative","zIndex":"1","height":"36px","lineHeight":"36px",
		"width":"100%","borderRadius":"2px","transition":"all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms",
		"backgroundColor":"rgb(0, 188, 212)","textAlign":"center", marginBottom:"1em"}
};


class History extends Component {


	constructor(props) {
		super(props);
		this.props = props;
		this.makeFileLog = this.makeFileLog.bind(this);
		this.makeFileRewardLog = this.makeFileRewardLog.bind(this);
		this.makeFileActionLog = this.makeFileActionLog.bind(this);
	}

    state = { 
	};

    componentDidMount() {

			fetch (
				localStorage.getItem('serverurl')+"/stats/"+ this.props.record.id +"/currenttheta", 
				{
					method: 'GET',  
					headers: new Headers({ 'Content-Type': 'application/json' }),
					credentials: 'include',
				},
			).then(response => response.text().then(text => ({

				status: response.status,
				statusText: response.statusText,
				headers: response.headers,
				body: text,

			}))).then(({ status, statusText, headers, body }) => {

				let json;
				try {
					json = JSON.parse(body);
					var str = JSON.stringify(json, undefined, 4);
					this.setState({currentThetaString: str})
				} catch (e) {
					// 
				}
				if (status < 200 || status >= 300) {
					return Promise.reject(statusText, status);
				}
        });


		fetch (
				localStorage.getItem('serverurl')+"/stats/"+ this.props.record.id +"/hourlytheta", 
				{
					method: 'GET',  
					headers: new Headers({ 'Content-Type': 'application/json' }),
					credentials: 'include',
				},
			).then(response => response.text().then(text => ({

				status: response.status,
				statusText: response.statusText,
				headers: response.headers,
				body: text,

			}))).then(({ status, statusText, headers, body }) => {

				let json;
				try {
					json = JSON.parse(body);
					var str = JSON.stringify(json, undefined, 4);
					this.setState({hourlyThetaString: str})
				} catch (e) {
					// 
				}
				if (status < 200 || status >= 300) {
					return Promise.reject(statusText, status);
				}
        });


		fetch (
				localStorage.getItem('serverurl')+"/stats/"+ this.props.record.id +"/summary", 
				{
					method: 'GET',  
					headers: new Headers({ 'Content-Type': 'application/json' }),
					credentials: 'include',
				},
			).then(response => response.text().then(text => ({

				status: response.status,
				statusText: response.statusText,
				headers: response.headers,
				body: text,

			}))).then(({ status, statusText, headers, body }) => {

				let json;
				try {
					json = JSON.parse(body);
					var str = JSON.stringify(json, undefined, 4);
					this.setState({summary: str})
				} catch (e) {
					// 
				}
				if (status < 200 || status >= 300) {
					return Promise.reject(statusText, status);
				}
        });

    }

	makeFileLog(done) {

		fetch (
				localStorage.getItem('serverurl')+"/stats/"+ this.props.record.id +"/log", 
				{
					method: 'GET',  
					headers: new Headers({ 'Content-Type': 'application/json' }),
					credentials: 'include',
				},
			).then(response => response.text().then(text => ({

				status: response.status,
				statusText: response.statusText,
				headers: response.headers,
				body: text,

			}))).then(({ status, statusText, headers, body }) => {

				let json;
				try {
					json = JSON.parse(body);
					done({
							mime: 'application/json',
							filename: 'log.json',
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


	makeFileActionLog(done) {

		fetch (
				localStorage.getItem('serverurl')+"/stats/"+ this.props.record.id +"/actionlog", 
				{
					method: 'GET',  
					headers: new Headers({ 'Content-Type': 'application/json' }),
					credentials: 'include',
				},
			).then(response => response.text().then(text => ({

				status: response.status,
				statusText: response.statusText,
				headers: response.headers,
				body: text,

			}))).then(({ status, statusText, headers, body }) => {

				let json;
				try {
					json = JSON.parse(body);
					done({
							mime: 'application/json',
							filename: 'log.json',
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

	makeFileRewardLog(done) {

		fetch (
				localStorage.getItem('serverurl')+"/stats/"+ this.props.record.id +"/rewardlog", 
				{
					method: 'GET',  
					headers: new Headers({ 'Content-Type': 'application/json' }),
					credentials: 'include',
				},
			).then(response => response.text().then(text => ({

				status: response.status,
				statusText: response.statusText,
				headers: response.headers,
				body: text,

			}))).then(({ status, statusText, headers, body }) => {

				let json;
				try {
					json = JSON.parse(body);
					done({
							mime: 'application/json',
							filename: 'log.json',
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

    render() {
        const {
            currentThetaString,
			hourlyThetaString,
			summary,
        } = this.state;
        return (
            <div>
                <div style={styles.flex}>
                    <div style={styles.leftCol}>
                        <div style={styles.singleCol}>
							<Card style={styles.card}>
								<CardTitle title="Current Theta" subtitle="" />
								<pre style={styles.pre}> {currentThetaString} </pre>
							</Card>
						</div>

		                <div style={styles.singleCol}>
							<Card style={styles.card2}>	
							<CardTitle title="Downloads" subtitle="" />
								<DownloadButton style={styles.button} generateTitle="Generate and download log"  loadingTitle="Generating log file..." downloadTitle="Click to download log" async={true} genFile={this.makeFileLog}/>
								<DownloadButton style={styles.button} generateTitle="Generate and download action log"  loadingTitle="Generating action log file..." downloadTitle="Click to download action log" async={true} genFile={this.makeFileActionLog}/>
								<DownloadButton style={styles.button} generateTitle="Generate and download reward log"  loadingTitle="Generating reward log file..." downloadTitle="Click to download reward log" async={true} genFile={this.makeFileRewardLog}/>
							</Card>
						</div>
                    </div>

                    <div style={styles.rightCol}>
                        <div style={styles.singleCol}>
							<Card style={styles.card}>
								<CardTitle title="Hourly Theta" subtitle="" />
								<pre style={styles.pre}> {hourlyThetaString} </pre>
							</Card>
                        </div>

                        <div style={styles.singleCol}>
							<Card style={styles.card}>
								<CardTitle title="Summary" subtitle="" />
								<pre style={styles.pre}> {summary} </pre>
							</Card>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default withWidth()(History);

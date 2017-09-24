import React, { Component } from 'react';
import withWidth from 'material-ui/utils/withWidth';
import { sbConfig } from './config'
import { Card, CardTitle } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import CustomerIcon from 'material-ui/svg-icons/social/person-add';

import DownloadButton from './DownloadButton'

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

    state = { 
		mainFile: {
			mime: 'text/plain',
			filename: 'myexportedfile.txt',
			contents: 'all of the exports',
		}
	};

    componentDidMount() {

			fetch (
				sbConfig.sbConnectionUrl+"/stats/"+"1318627cc5"+"/currenttheta.json", 
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
					var obj = JSON.stringify(json, null, 2); // spacing level = 2
					//var obj = {a:1, 'b':'foo', c:[false,'false',null, 'null', {d:{e:1.3e5,f:'1.3e5'}}]};
					var str = JSON.stringify(obj, undefined, 4);
					this.setState({currentThetaString: str})
				} catch (e) {
					// 
				}
				if (status < 200 || status >= 300) {
					return Promise.reject(statusText, status);
				}
        });

		fetch (
				sbConfig.sbConnectionUrl+"/stats/"+1234+"/currenttheta.json", 
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
					var obj = JSON.stringify(json, null, 2); // spacing level = 2
					var obj = {a:1, 'b':'foo', c:[false,'false',null, 'null', {d:{e:1.3e5,f:'1.3e5'}}]};
					var str = JSON.stringify(obj, undefined, 4);
					this.setState({hourlyThetaString: str})
				} catch (e) {
					// 
				}
				if (status < 200 || status >= 300) {
					return Promise.reject(statusText, status);
				}
        });

		fetch (
				sbConfig.sbConnectionUrl+"/stats/"+1234+"/currenttheta.json", 
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
					var obj = JSON.stringify(json, null, 2); // spacing level = 2
					var obj = {a:1, 'b':'foo', c:[false,'false',null, 'null', {d:{e:1.3e5,f:'1.3e5'}}]};
					var str = JSON.stringify(obj, undefined, 4);
					this.setState({hourlyThetaString: str})
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
			mainFile,
        } = this.state;
        const { width } = this.props;
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
								<DownloadButton style={styles.button} downloadTitle="Download Log" fileData={mainFile}/>
								<DownloadButton style={styles.button} downloadTitle="Download Action Log" fileData={mainFile}/>	
								<DownloadButton style={styles.button} downloadTitle="Download Reward Log" fileData={mainFile}/>	
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
								<pre style={styles.pre}> {hourlyThetaString} </pre>
							</Card>
                        </div>


                    </div>


                </div>
            </div>
        );
    }
}

export default withWidth()(History);

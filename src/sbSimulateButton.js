import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { sbConfig } from './config'


 const styles = {
    input: { marginLeft: '16px', marginBottom: '50px' },
    button: { margin: '1em', marginLeft: '16px' },
	pre:  { marginLeft: '18px', whiteSpace: "pre-wrap", wordWrap:"break-word", fontSize:12},
};

export default class SimulateButton extends React.Component { 

	constructor(props) {
		super(props);
		this.props = props;
		this.handleClick = this.handleClick.bind(this);
	}

    state = { 
	};


    handleClick(e) {
			fetch(
				sbConfig.sbConnectionUrl+"/eval/" + this.props.record.id + "/simulate?N=100&log_stats=True&verbose=False",
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
					var obj = JSON.stringify(json, null, 2); 
					var str = JSON.stringify(obj, undefined, 4);
					this.setState({simResult: str})
				} catch (e) {
					// not json
				}
				if (status < 200 || status >= 300) {
					this.setState({simResult: "Python Syntax error - " + status + " " + statusText})
					return Promise.reject(statusText, status);
				}
        });
    }

    componentDidMount() {

    }
       
    render() {
        const {
			simResult,
        } = this.state;
		return (
				<div>
					<RaisedButton name="sim" onClick={this.handleClick} label="Run a simulation of the experiment" value="set" primary={true} style={styles.button} />
					<pre style={styles.pre}>{simResult}</pre>
				</div>
         )
		 

    }
}
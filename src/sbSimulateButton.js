import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { sbConfig } from './config'


 const styles = {
    input: { marginLeft: '16px', marginBottom: '50px' },
    button: { margin: '1em', marginLeft: '16px' },
};

export default class SimulateButton extends React.Component { 

	constructor(props) {
		super(props);
		this.props = props;
	}

    handleClick(e) {
			fetch(
				sbConfig.sbConnectionUrl+"/eval/" + this.props.record.id + "/simulate?N=1000&log_stats=True&verbose=True",
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
					this.setState({defaultExps: Object.values(json)})
				} catch (e) {
					// not json
				}
				if (status < 200 || status >= 300) {
					return Promise.reject(statusText, status);
				}
        });
    }

    componentDidMount() {

    }
       
    render() {

		return (
		        <RaisedButton name="sim" onClick={this.handleClick.bind(this)} label="Run a simulation of the experiment" value="set" primary={true} style={styles.button} />
         )
		 

    }
}
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { sbConfig } from '../config'


 const styles = {
    input: { marginLeft: '16px', marginBottom: '50px' },
    button: { margin: '1em', marginLeft: '16px' },
	text: { marginLeft: '15px', fontSize: '18px', marginBottom: '1em'},
};

export default class Custom extends React.Component { 

    logme(something) {
        console.log(something);
    }


    handleClick(e) {
        //this.logme("Value on clicked: "+document.getElementById('text-field-default').value );
		localStorage.setItem('serverurl', document.getElementById('text-field-default').value );
		window.location.reload()
    }

    componentDidMount() {
        //this.logme("Mount");

		if(localStorage.getItem('serverurl')) {  document.getElementById('text-field-default').value = localStorage.getItem('serverurl') }
    }

    render() {

		return (
           <div>
				<div style={styles.text}>Set StreamingBandit server URL (without a trailing /):</div>
				<TextField name="seturl" id="text-field-default" defaultValue={sbConfig.sbConnectionUrl} style={styles.input} />
		        <RaisedButton onClick={this.handleClick.bind(this)} label="Set and reload" value="set" primary={true} style={styles.button} />
           </div>
         )
		 

    }
}
import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import { easyComp } from 'react-easy-state'
import store from './store'

const styles = {
  customWidth: {
    width: 400,
  },
};

class DefaultOptionsField extends React.Component { 
	  constructor(props) {
		super(props);
		this.props = props
		this.state = { defaultExps : [] };
		this.handleChange = this.handleChange.bind(this);
	  }

    handleClick(e) {
        //this.logme("Value on clicked: "+document.getElementById('text-field-default').value );
    }

	handleChange(event, index, value) {
		fetch (
				store.serverurl+"/exp/defaults/"+ index, 
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
					let cm = document.getElementsByClassName("aor-input-get_context")[0].getElementsByClassName("CodeMirror")[0]
					let editor = cm.CodeMirror;
					var html = json.get_context
					editor.setValue(html);
					cm = document.getElementsByClassName("aor-input-get_action")[0].getElementsByClassName("CodeMirror")[0]
					editor = cm.CodeMirror;
					html = json.get_action
					editor.setValue(html);
					cm = document.getElementsByClassName("aor-input-get_reward")[0].getElementsByClassName("CodeMirror")[0]
					editor = cm.CodeMirror;
					html = json.get_reward
					editor.setValue(html);
					cm = document.getElementsByClassName("aor-input-set_reward")[0].getElementsByClassName("CodeMirror")[0]
					editor = cm.CodeMirror;
					html = json.set_reward
					editor.setValue(html);
					//cm = document.getElementsByClassName("aor-input-name")[0].getElementsByTagName("input")[0]
					//cm.value = json.name
					
				} catch (e) {
					// 
				}
				if (status < 200 || status >= 300) {
					return Promise.reject(statusText, status);
				}
        });

    }


    componentWillMount() {
			fetch(
				store.serverurl+"/exp/defaults", 
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
					// not json, no big deal
				}
				if (status < 200 || status >= 300) {
					return Promise.reject(statusText, status);
				}
        });

    }

    render() {
		return (
           <div>
				<SelectField onChange={ this.handleChange } style={styles.customWidth} floatingLabelText="Use default experiment">
					    {this.state.defaultExps.map((name, index) => (
							<MenuItem key={index} value={index} primaryText={name} />
						))}
				</SelectField>
           </div>
         )
    }
}

export default easyComp(DefaultOptionsField)
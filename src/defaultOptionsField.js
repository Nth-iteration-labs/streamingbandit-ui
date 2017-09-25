import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import { sbConfig } from './config'

const styles = {
  customWidth: {
    width: 400,
  },
};

function getReactDomComponent(dom) {
  const internalInstance = dom[Object.keys(dom).find(key =>
    key.startsWith('__reactInternalInstance$'))];
  if (!internalInstance) return null;
  return internalInstance._currentElement;
}

export default class DefaultOptionsField extends React.Component { 
	  constructor(props) {
		super(props);
		this.state = { defaultExps : [] };
	  }

    handleClick(e) {
        //this.logme("Value on clicked: "+document.getElementById('text-field-default').value );
    }

	handleChange(event, index, value) {
		console.log(index)
		var cm = document.getElementsByClassName("aor-input-get_context")[0].getElementsByClassName("react-codemirror2")[0]
		console.log(getReactDomComponent(cm));
    }

    componentWillMount() {
			fetch(
				sbConfig.sbConnectionUrl+"/exp/defaults", 
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
	
					//console.log(this.state)
					this.setState({defaultExps: Object.values(json)})
					///console.log(this.state)
				} catch (e) {
					// not json, no big deal
				}
				if (status < 200 || status >= 300) {
					return Promise.reject(statusText, status);
				}
				//return { status, headers, body, json };
        });

    }

    render() {
		return (
           <div>
				<SelectField onChange={ this.handleChange } style={styles.customWidth} floatingLabelText="Fill fields with default values">
					    {this.state.defaultExps.map((name, index) => (
							<MenuItem key={index} value={index} primaryText={name} />
						))}
				</SelectField>
           </div>
         )
		 

    }
}
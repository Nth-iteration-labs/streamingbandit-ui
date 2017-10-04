import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import store from '../stores/store'

const styles = {
    customWidth: {
        width: 400,
    },
};

class DefaultOptionsField extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {defaultExps: []};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, index, value) {

		this.setState({value})

        fetch(
            store.serverurl + "/exp/defaults/" + index,
            {
                method: 'GET',
                headers: new Headers({'Content-Type': 'application/json'}),
                credentials: 'include',
            },
        ).then(response => response.text().then(text => ({
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            ok: response.ok,
            body: text,

        }))).then(({status, statusText, headers, body, ok}) => {

			console.log(ok)
            if (!ok) {
                let cm = document.getElementsByClassName("aor-input-get_context")[0].getElementsByClassName("CodeMirror")[0];
                let editor = cm.CodeMirror;
				let errortext = JSON.stringify(JSON.parse(body), undefined, 2);
                editor.setValue("Server error:\n\n" + errortext + "\n\n");
				cm = document.getElementsByClassName("aor-input-get_action")[0].getElementsByClassName("CodeMirror")[0];
				editor = cm.CodeMirror;
				editor.setValue("");
				cm = document.getElementsByClassName("aor-input-get_reward")[0].getElementsByClassName("CodeMirror")[0];
				editor = cm.CodeMirror;
				editor.setValue("");
				cm = document.getElementsByClassName("aor-input-set_reward")[0].getElementsByClassName("CodeMirror")[0];
				editor = cm.CodeMirror;
				editor.setValue("");
                throw Error(statusText);
            }

            let json;
            try {
                var html = ""

                json = JSON.parse(body);
                let cm = document.getElementsByClassName("aor-input-get_context")[0].getElementsByClassName("CodeMirror")[0];
                let editor = cm.CodeMirror;
                if (json.hasOwnProperty('get_context')) html = json.get_context; else html = "# not defined \n";
                editor.setValue(html);
                cm = document.getElementsByClassName("aor-input-get_action")[0].getElementsByClassName("CodeMirror")[0];
                editor = cm.CodeMirror;
                if (json.hasOwnProperty('get_action')) html = json.get_action; else html = "# not defined \n";
                editor.setValue(html);
                cm = document.getElementsByClassName("aor-input-get_reward")[0].getElementsByClassName("CodeMirror")[0];
                editor = cm.CodeMirror;
                if (json.hasOwnProperty('get_reward')) html = json.get_reward; else html = "# not defined \n";
                editor.setValue(html);
                cm = document.getElementsByClassName("aor-input-set_reward")[0].getElementsByClassName("CodeMirror")[0];
                editor = cm.CodeMirror;
                if (json.hasOwnProperty('set_reward')) html = json.set_reward; else html = "# not defined \n";
                editor.setValue(html);
                //cm = document.getElementsByClassName("aor-input-name")[0].getElementsByTagName("input")[0]
                //cm.value = json.name

            } catch (e) {
                //
            }
            if (status < 200 || status >= 300) {
                return Promise.reject(statusText);
            }
        }).catch(function(error) {
            return Promise.reject(error);
        });

    }

    componentWillMount() {
        fetch(
            store.serverurl + "/exp/defaults",
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
                <SelectField {...this.props} onChange={this.handleChange} value={this.state.value} style={styles.customWidth}
                             floatingLabelText="Use experiment template">
                    {this.state.defaultExps.map((name, index) => (
                        <MenuItem key={index} value={index} primaryText={name}/>
                    ))}
                </SelectField>
            </div>
        )
    }
}

export default DefaultOptionsField
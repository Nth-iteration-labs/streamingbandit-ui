import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {easyComp} from 'react-easy-state'
import store from '../stores/store'

const styles = {
    input: {marginLeft: '16px', marginBottom: '50px'},
    button: {margin: '1em', marginLeft: '16px'},
};

class ResetButton extends React.Component {

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
            <RaisedButton onClick={this.handleClick.bind(this)} label="Reset theta of Experiment" value="set"
                          primary={true} style={styles.button}/>
        )


    }
}

export default easyComp(ResetButton)


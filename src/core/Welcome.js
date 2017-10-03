import React from 'react';
import {Card, CardActions, CardHeader} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import LightBulbIcon from 'material-ui/svg-icons/action/lightbulb-outline';
import CodeIcon from 'material-ui/svg-icons/action/code';
import FlatButton from 'material-ui/FlatButton';
import {translate} from 'admin-on-rest';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

const styles = {
    button: {
        marginTop: '-20px',
        marginLeft: '70px',
    },
    connectedtext: {
        display: "block",
        marginBottom: "48px",
        marginLeft: "73px",
        marginTop: "-15px",
    },
};


export default translate(({style, translate, localClientUrl}) => (
    <Card style={style}>
        <CardHeader
            title={"Welcome to StreamingBandit!"}
            titleStyle={{'fontSize': '20px', 'fontWeight': 'bold', 'marginBottom': '20px', 'marginTop': '8px'}}
            subtitle={`This is the homepage for the StreamingBandit server hosted by the N-th Iteration Lab. 
			           Solving (bandit) decision problems in data streams in production environment is challenging. 
					   With this Python module we are trying to develop a framework for streaming/online solutions to bandit 
					   problems which can be used to experiment with novel solutions in production environments.`}
            subtitleStyle={{'fontSize': '16px', 'fontWeight': 'normal', 'marginBottom': '20px'}}
            avatar={<Avatar backgroundColor="#FFEB3B" icon={<LightBulbIcon/>}/>}
        />
        <div style={styles.connectedtext}>You are currently connected to the StreamingBandit server at:
            <b>{localClientUrl}</b></div>
        <RaisedButton
            href="https://github.com/callemall/material-ui"
            target="_blank"
            label="Go get me on GitHub!"
            secondary={true}
            style={styles.button}
            icon={<FontIcon className="muidocs-icon-custom-github"/>}
        />
        <CardActions style={{textAlign: 'right'}}>
            <FlatButton label={"Backend on GitHub"} icon={<CodeIcon/>}
                        href="https://github.com/Nth-iteration-labs/streamingbandit"/>
            <FlatButton label={"Frontend on GitHub"} icon={<CodeIcon/>}
                        href="https://github.com/Nth-iteration-labs/streamingbandit-ui"/>
            <FlatButton label={"Documentation"} icon={<CodeIcon/>}
                        href="http://nth-iteration-labs.github.io/streamingbandit/"/>
        </CardActions>
    </Card>
));

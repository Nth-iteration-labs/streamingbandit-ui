import React from 'react';
import { Card, CardHeader, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import LightBulbIcon from 'material-ui/svg-icons/action/lightbulb-outline';
import HomeIcon from 'material-ui/svg-icons/action/home';
import CodeIcon from 'material-ui/svg-icons/action/code';
import FlatButton from 'material-ui/FlatButton';
import { translate } from 'admin-on-rest';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAndroid from 'material-ui/svg-icons/action/code';
import FontIcon from 'material-ui/FontIcon';

const styles = {
  button: {
    margin: 12,
    marginLeft: '70px',
  },
};


export default translate(({ style, translate }) => (
    <Card style={style}>
        <CardHeader
            title={"Welcome to StreamingBandit!"}
            subtitle={`This is the homepage for the StreamingBandit server hosted by the N-th Iteration Lab. 
			           Solving (bandit) decision problems in data streams in production environment is challenging. 
					   With this Python module we are trying to develop a framework for streaming/online solutions to bandit 
					   problems which can be used to experiment with novel solutions in production environments.`}
            avatar={<Avatar backgroundColor="#FFEB3B" icon={<LightBulbIcon />} />}
        />
		<RaisedButton
      href="https://github.com/callemall/material-ui"
      target="_blank"
      label="Go get me on GitHub!"
      secondary={true}
      style={styles.button}
      icon={<FontIcon className="muidocs-icon-custom-github" />}
    />
        <CardActions style={{ textAlign: 'right' }}>
            <FlatButton label={"Backend on GitHub"} icon={<CodeIcon />} href="https://github.com/Nth-iteration-labs/streamingbandit" />
			<FlatButton label={"Frontend on GitHub"} icon={<CodeIcon />} href="https://github.com/Nth-iteration-labs/streamingbandit-ui" />
            <FlatButton label={"Documentation"} icon={<CodeIcon />} href="http://nth-iteration-labs.github.io/streamingbandit/" />
        </CardActions>
    </Card>
));

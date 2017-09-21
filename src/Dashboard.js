// in src/Dashboard.js
import React, { Component } from 'react';
import withWidth from 'material-ui/utils/withWidth';
import { AppBarMobile } from 'admin-on-rest';

import Welcome from './Welcome';

const styles = {
    welcome: { marginBottom: '2em' },
    flex: { display: 'flex' },
    leftCol: { flex: 1, marginRight: '1em' },
    rightCol: { flex: 1, marginLeft: '1em' },
    singleCol: { marginTop: '2em' },
};

class Dashboard extends Component {
    state = {};

    render() {
        const { width } = this.props;
        return (
            <div>
                {width === 1 && <AppBarMobile title="StreamingBandit" />}
                <Welcome style={styles.welcome} />
            </div>
        );
    }
}

export default withWidth()(Dashboard);


import React from 'react';
import {connect} from 'react-redux';
import {Card, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {changeLocale as changeLocaleAction, translate, ViewTitle} from 'admin-on-rest';
import {changeTheme as changeThemeAction} from '../actions/actions';

const styles = {
    label: {width: '140px', display: 'inline-block', fontSize: "18px"},
    button: {margin: '1em'},
};

const Configuration = ({theme, locale, changeTheme, changeLocale, translate}) => (
    <Card>
        <ViewTitle title={"Configuration"}/>
        <CardText>
            <div style={styles.label}>Set theme:</div>
            <RaisedButton style={styles.button} label="Light" primary onClick={() => changeTheme('light')}/>
            <RaisedButton style={styles.button} label="Dark" secondary onClick={() => changeTheme('dark')}/>
        </CardText>
    </Card>
);

const mapStateToProps = state => ({
    theme: state.theme,
    locale: state.locale,
});

export default connect(mapStateToProps, {
    changeLocale: changeLocaleAction,
    changeTheme: changeThemeAction,
})(translate(Configuration));

import React from 'react';
import { connect } from 'react-redux';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { translate, changeLocale as changeLocaleAction, ViewTitle } from 'admin-on-rest';

import { changeTheme as changeThemeAction } from './actions';
import { Edit, Datagrid, SimpleForm, DisabledInput, DateField, EditButton, ReferenceManyField, TextField, TextInput } from 'admin-on-rest';
import { sbConfig } from '../config'

const styles = {
    label: { width: '10em', display: 'inline-block' },
    button: { margin: '1em' },
};

const Configuration = ({ theme, locale, changeTheme, changeLocale, translate }) => (
    <Card>
        <ViewTitle title={"Configuration"} />
        <CardText>
            <div style={styles.label}>Theme</div>
            <RaisedButton style={styles.button} label="Light" primary onClick={() => changeTheme('light')} />
            <RaisedButton style={styles.button} label="Dark" secondary onClick={() => changeTheme('dark')} />
        </CardText>
			<SimpleForm>
			    <div>Set default StreamingBandit server URL, without a trailing slash.</div>
				<TextInput defaultValue={sbConfig.sbConnectionUrl} source={sbConfig.sbConnectionUrl} />
			</SimpleForm>
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

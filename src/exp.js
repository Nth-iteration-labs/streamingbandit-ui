// in src/exp.js
import React from 'react';

import { EditButton, DisabledInput, LongTextInput, SimpleForm  } from 'admin-on-rest';
import { List, Edit, Create, Datagrid, TextField, NumberInput } from 'admin-on-rest';
import { TabbedForm, FormTab } from 'admin-on-rest'
import { required, minLength } from 'admin-on-rest';
import { SelectInput } from 'admin-on-rest';

import { DependentInput } from 'aor-dependent-input';

const styles = {
    codeinput: {
		/*fontFamily: "monospace",
		fontSize: "17px",
		fontStyle: "normal",
		fontVariant: "normal",
		fontWeight: "400",
		lineHeight: "23px"*/
	}
};

export const ExpList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
			<TextField source="name" />
            <EditButton />
        </Datagrid>
    </List>
);


var CodeMirror = require('react-codemirror');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/python/python');
require('codemirror/addon/display/autorefresh');

var codemirrorui={
	lineNumbers: true,
	autoRefresh:true,
	styleActiveLine: true,
	mode: 'python'
}

const PostTitle = ({ record }) => {
    return <span>Experiment {record ? `"${record.name}"` : ''}</span>;
};

export const ExpEdit = (props) => (
    <Edit title={<PostTitle />} {...props}>
        <TabbedForm>
            <FormTab label="Settings">
				<DisabledInput source="id" />
				<CodeMirror value="" options={codemirrorui} />
				<LongTextInput label="Name of the experiment" source="name"  validate={[required]}/>
				<LongTextInput label="Get context" elStyle={styles.codeinput} source="get_context" options={{rows: 2}} validate={[required, minLength(4)]}/>
				<LongTextInput label="Get action" elStyle={styles.codeinput} source="get_action" options={{rows: 2}} validate={[required, minLength(4)]}/>
				<LongTextInput label="Get reward" elStyle={styles.codeinput} source="get_reward" options={{rows: 2}} validate={[required, minLength(4)]}/>
				<LongTextInput label="Set reward" elStyle={styles.codeinput} source="set_reward" options={{rows: 2}} validate={[required, minLength(4)]}/>
				<SelectInput source="hourly_theta" choices={[
					{ id: 'true', name: 'Store theta every hour' },
					{ id: 'false', name: 'Do not store theta' },
				]} />
				<SelectInput source="advice_id" choices={[
					{ id: 'true', name: 'Return an advice_id' },
					{ id: 'false', name: 'Do not return an advice_id' },
				]} />
				<DependentInput dependsOn="advice_id" value="true">
					<NumberInput label="Delta hours" source="delta_hours" step={1} />
					<LongTextInput label="Default reward" source="default_reward" />
				</DependentInput>
            </FormTab>
            <FormTab label="History">
				<DisabledInput source="id" />
	        </FormTab>
            <FormTab label="Simulate">
				<DisabledInput source="id" />
	        </FormTab>
        </TabbedForm>
    </Edit>
);



export const ExpCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
			<LongTextInput label="Name of the experiment" source="name"  validate={[required]}/>
			<LongTextInput label="Get context" elStyle={styles.codeinput} source="get_context" options={{rows: 2}} validate={[required, minLength(4)]}/>
			<LongTextInput label="Get action" elStyle={styles.codeinput} source="get_action" options={{rows: 2}} validate={[required, minLength(4)]}/>
			<LongTextInput label="Get reward" elStyle={styles.codeinput} source="get_reward" options={{rows: 2}} validate={[required, minLength(4)]}/>
			<LongTextInput label="Set reward" elStyle={styles.codeinput} source="set_reward" options={{rows: 2}} validate={[required, minLength(4)]}/>
			<SelectInput source="hourly_theta" choices={[
				{ id: 'true', name: 'Store theta every hour' },
				{ id: 'false', name: 'Do not store theta' },
			]} />
			<SelectInput source="advice_id" choices={[
				{ id: 'true', name: 'Return an advice id' },
				{ id: 'false', name: 'Do not return an advice id' },
			]} />
			<DependentInput dependsOn="advice_id" value="true">
				<NumberInput label="Delta hours" source="delta_hours" step={1} />
				<LongTextInput label="Default reward" source="default_reward" />
			</DependentInput>
        </SimpleForm>
    </Create>
);

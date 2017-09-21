// in src/exp.js
import React from 'react';
import { List, Edit, Create, Datagrid, TextField, NumberInput, EditButton, DisabledInput, LongTextInput, SimpleForm,BooleanInput  } from 'admin-on-rest';
import { TabbedForm, FormTab } from 'admin-on-rest'

export const ExpList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
			<TextField source="name" />
            <EditButton />
        </Datagrid>
    </List>
);

const PostTitle = ({ record }) => {
    return <span>Experiment: {record ? `"${record.name}"` : ''}</span>;
};

export const ExpEdit = (props) => (
    <Edit title={<PostTitle />} {...props}>
        <TabbedForm>
            <FormTab label="Settings">
				<DisabledInput source="id" />
				<div>Name of the experiment:</div>
				<LongTextInput label="Title" source="name" />
				<div>Python code for get context:</div>
				<LongTextInput label="getcontext" source="getcontext" />
				<div>Python code for get action:</div>
				<LongTextInput label="getaction" source="getaction" />
				<div>Python code for get reward:</div>
				<LongTextInput label="getreward" source="getreward" />
				<div>Python code for set reward:</div>
				<LongTextInput label="setreward" source="setreward" />
				<div>Should the state of Theta be stored hourly?</div>
				<BooleanInput label="hourly" source="hourly"  />
				<div>Should the getAdvice and setReward calls return an advice_id?</div>
				<BooleanInput source="advice_id" />
				<div>If advice_id is True, supply this to give the number of days that an advice_id should be stored:</div>
				<NumberInput source="delta_days" step={1} />
				<div>If advice_id is True, supply this python dict to give the default reward for advice_id's that are over their delta_days limit:</div>
				<LongTextInput label="Default reward" source="default_reward" />
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
			<div>Name of the experiment:</div>
			<LongTextInput label="Title" source="name" />
			<div>Python code for get context:</div>
			<LongTextInput label="getContext" source="getcontext" />
			<div>Python code for get action:</div>
			<LongTextInput label="getAction" source="getaction" />
			<div>Python code for get reward:</div>
			<LongTextInput label="getReward" source="getreward" />
			<div>Python code for set reward:</div>
			<LongTextInput label="setReward" source="setreward" />
			<div>Should the state of Theta be stored hourly?</div>
			<BooleanInput label="Hourly" source="hourly" />
			<div>Should the getAdvice and setReward calls return an advice_id?</div>
			<BooleanInput source="advice_id" />
			<div>If advice_id is True, supply this to give the number of days that an advice_id should be stored:</div>
			<NumberInput source="delta_days" step={1} />
			<div>If advice_id is True, supply this python dict to give the default reward for advice_id's that are over their delta_days limit:</div>
			<LongTextInput label="Default reward" source="default_reward" />
        </SimpleForm>
    </Create>
);

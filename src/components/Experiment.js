import React from 'react';

import {
    Create,
    Datagrid,
    Edit,
    EditButton,
    FormTab,
    List,
    NumberInput,
    required,
    SelectInput,
    SimpleForm,
    TabbedForm,
    TextField,
    TextInput
} from 'admin-on-rest';

import DefaultOptionsField from './DefaultOptionsField'
import {DependentInput} from 'aor-dependent-input';
import SimulateButton from './SbSimulateButton'
import ResetButton from './SbResetButton'
import History from './History'
import CodeMirrorInput from './CodeMirrorInput'

const PostTitle = ({record}) => {
    return <span>Experiment {record ? `"${record.name}"` : ''}</span>;
};

const validateExpCreation = (values) => {
    const errors = {};
    if (!values.get_context) {
        errors.name = ['Get context is required'];
    }
    if (!values.get_action) {
        errors.name = ['Get action is required'];
    }
    if (!values.get_reward) {
        errors.name = ['Get reward is required'];
    }
    if (!values.set_reward) {
        errors.name = ['Set reward is required'];
    }
    return errors
};

export const ExpList = (props) => (
    <List {...props}>
        <Datagrid bodyOptions={{stripedRows: true, showRowHover: true}}>
            <TextField source="id"/>
            <TextField source="key"/>
            <TextField source="name"/>
            <EditButton/>
        </Datagrid>
    </List>
);


export const ExpEdit = (props) => (
    <Edit title={<PostTitle/>} {...props}>
        <TabbedForm validate={validateExpCreation} {...props}>
            <FormTab label="Settings" {...props}>
                <TextInput ref='name' name="name " label="Name of the experiment" source="name" validate={[required]}/>
                <TextField name="id" source="id"/>
                <TextField name="key" source="key"/>
                <DefaultOptionsField {...props} name="field"/>
                <CodeMirrorInput {...props} name="get_context" label="Get context" source="get_context"
                                 options={{rows: 2}}/>
                <CodeMirrorInput {...props} name="get_action" label="Get action" source="get_action"
                                 options={{rows: 2}}/>
                <CodeMirrorInput {...props} name="get_reward" label="Get reward" source="get_reward"
                                 options={{rows: 2}}/>
                <CodeMirrorInput {...props} name="set_reward" label="Set reward" source="set_reward"
                                 options={{rows: 2}}/>
                <SelectInput validate={[required]} source="hourly_theta" choices={[
                    {id: 'true', name: 'Store theta every hour'},
                    {id: 'false', name: 'Do not store theta'},
                ]}/>
                <SelectInput source="advice_id" validate={[required]} choices={[
                    {id: 'true', name: 'Return an advice_id'},
                    {id: 'false', name: 'Do not return an advice_id'},
                ]}/>
                <DependentInput dependsOn="advice_id" value="true">
                    <NumberInput label="Delta hours" source="delta_hours" step={1}/>
                    <CodeMirrorInput name="default_reward" label="Default reward" source="default_reward"/>
                </DependentInput>
            </FormTab>
            <FormTab label="History">
                <ResetButton name="resetbutton" {...props}/>
                <History name="history" {...props} />
            </FormTab>
            <FormTab label="Simulate" name="Simulate">
                <SimulateButton name="simulationbutton" {...props}/>
            </FormTab>
        </TabbedForm>
    </Edit>
);

export const ExpCreate = (props) => (
    <Create {...props}>
        <SimpleForm {...props}>
            <TextInput ref='name' label="Name of the experiment" source="name" validate={[required]}/>
            <DefaultOptionsField name="field"/>
            <CodeMirrorInput {...props} name="get_context" label="Get context" source="get_context"
                             options={{rows: 2}}/>
            <CodeMirrorInput {...props} name="get_action" label="Get action" source="get_action" options={{rows: 2}}/>
            <CodeMirrorInput {...props} name="get_reward" label="Get reward" source="get_reward" options={{rows: 2}}/>
            <CodeMirrorInput {...props} name="set_reward" label="Set reward" source="set_reward" options={{rows: 2}}/>
            <SelectInput validate={[required]} source="hourly_theta" choices={[
                {id: 'true', name: 'Store theta every hour'},
                {id: 'false', name: 'Do not store theta'},
            ]}/>
            <SelectInput validate={[required]} source="advice_id" choices={[
                {id: 'true', name: 'Return an advice id'},
                {id: 'false', name: 'Do not return an advice id'},
            ]}/>
            <DependentInput dependsOn="advice_id" value="true">
                <NumberInput label="Delta hours" source="delta_hours" step={1}/>
                <CodeMirrorInput label="Default reward" source="default_reward"/>
            </DependentInput>
        </SimpleForm>
    </Create>
);

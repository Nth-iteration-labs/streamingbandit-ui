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
    SimpleForm,
    LongTextInput,
    BooleanInput,
    TabbedForm,
    TextField,
    TextInput
} from 'admin-on-rest';

import DefaultOptionsField from './DefaultOptionsField'
import {DependentInput} from 'aor-dependent-input';
import SimulateButton from './SbSimulateButton'
import History from './History'
import Theta from './Theta'
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
    <List {...props} sort={{ field: 'name', order: 'ASC' }}>
        <Datagrid bodyOptions={{stripedRows: true, showRowHover: true}} >
            <TextField source="id"/>
            <TextField source="key"/>
            <TextField source="name"/>
            <EditButton/>
        </Datagrid>
    </List>
);

const checkCustomConstraint = v => (v==="true"||v===true||v==="True") ? true : false;
const truthyFormat = v => (v==="true"||v===true||v==="True") ? true : false
const truthyParse  = v => (v==="true"||v===true||v==="True") ? "True" : "False"


export const ExpEdit = (props) => (

    <Edit title={<PostTitle/>} {...props}>
        <TabbedForm {...props} validate={validateExpCreation} redirect={false}  submitOnEnter={true}>
            <FormTab label="Settings" {...props}>
                <TextInput name="name" {...props} label="Name of the experiment" source="name" validate={[required]}/>
                <TextField name="id" {...props} source="id" />
                <TextField name="key"  {...props} source="key"/>
                <DefaultOptionsField {...props} name="field"/>
                <CodeMirrorInput {...props} name="get_context" label="Get context" source="get_context" options={{rows: 2}}/>
                <CodeMirrorInput {...props} name="get_action" label="Get action" source="get_action" options={{rows: 2}}/>
                <CodeMirrorInput {...props} name="get_reward" label="Get reward" source="get_reward" options={{rows: 2}}/>
                <CodeMirrorInput {...props} name="set_reward" label="Set reward" source="set_reward" options={{rows: 2}}/>
                <BooleanInput label="Store theta every hour?" source="hourly_theta" parse ={truthyParse} format={truthyFormat}/>
                <BooleanInput label="Return an advice_id?"    source="advice_id"    parse ={truthyParse} format={truthyFormat}/>
                <DependentInput dependsOn="advice_id" resolve={checkCustomConstraint}>
                    <NumberInput label="Delta hours" source="delta_hours" step={1} validate={[required]}/>
                    <LongTextInput validate={[required]} name="default_reward" label="Default reward" source="default_reward" options={{multiLine: true,rows: 2}} />
                </DependentInput>
                <br/><br/>
            </FormTab>
            <FormTab label="Simulate" name="Simulate">
                <SimulateButton name="simulationbutton" {...props}/>
            </FormTab>
            <FormTab label="Theta">
                <Theta name="theta" {...props} />
            </FormTab>
            <FormTab label="Logs">
                <History name="history" {...props} />
            </FormTab>
        </TabbedForm>
    </Edit>
);

export const ExpCreate = (props) => (
    <Create {...props}>
        <SimpleForm {...props}>
            <TextInput label="Name of the experiment" source="name" validate={[required]}/>
            <DefaultOptionsField name="field"/>
            <CodeMirrorInput {...props} name="get_context" label="Get context" source="get_context" options={{rows: 2}}/>
            <CodeMirrorInput {...props} name="get_action" label="Get action" source="get_action" options={{rows: 2}}/>
            <CodeMirrorInput {...props} name="get_reward" label="Get reward" source="get_reward" options={{rows: 2}}/>
            <CodeMirrorInput {...props} name="set_reward" label="Set reward" source="set_reward" options={{rows: 2}}/>
            <BooleanInput label="Store theta every hour?" defaultValue = "False" source="hourly_theta" parse ={truthyParse} format={truthyFormat}/>
            <BooleanInput label="Return an advice_id?" defaultValue = "False" source="advice_id"    parse ={truthyParse} format={truthyFormat}/>
            <DependentInput dependsOn="advice_id" resolve={checkCustomConstraint}>
                <NumberInput label="Delta hours" source="delta_hours" step={1} validate={[required]}/>
                <LongTextInput validate={[required]} name="default_reward" label="Default reward" source="default_reward" />
            </DependentInput>
            <br/><br/>
        </SimpleForm>
    </Create>
);

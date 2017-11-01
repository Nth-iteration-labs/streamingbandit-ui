import React from "react";

import {
  BooleanInput,
  Create,
  Datagrid,
  Edit,
  EditButton,
  FormTab,
  FunctionField,
  List,
  LongTextInput,
  NumberInput,
  required,
  SimpleForm,
  TabbedForm,
  TextField,
  TextInput,
  minValue,
  maxValue, 
  number
} from "admin-on-rest";

import DefaultOptionsField from "../components/DefaultOptionsField";
import { DependentInput } from "aor-dependent-input";
import SimulateButton from "../components/SbSimulateButton";
import History from "../components/History";
import Theta from "../components/Theta";
import CodeMirrorInput from "../components/CodeMirrorInput";
import store from "../stores/store";

const PostTitle = ({ record }) => {
  return <span>Experiment {record ? `"${record.name}"` : ""}</span>;
};

const validateExpCreation = values => {
  // const errors = {};
  /* You can set custom errors here - for example: */
  /* if (!values.get_context) { errors.name = ['Get context is required']; */
  return {};
};

export const ExpList = props => (
  <List {...props} sort={{ field: "name", order: "ASC" }}>
    <Datagrid bodyOptions={{ stripedRows: true, showRowHover: true }}>
      <TextField source="id" />
      <TextField source="key" />
      <TextField source="name" />
      <EditButton />
    </Datagrid>
  </List>
);

const checkCustomConstraint = v => v === "true" || v === true || v === "True";
const checkCustomConstraintInverse = v =>
  !(v === "true" || v === true || v === "True");
const truthyFormat = v => v === "true" || v === true || v === "True";
const truthyParse = v =>
  v === "true" || v === true || v === "True" ? "True" : "False";

const getActionQuery = record =>
  store.serverurl +
  "/getaction/" +
  record.id +
  "?key=" +
  record.key +
  "&context=CONTEXT";
const setRewardQueryA = record =>
  store.serverurl +
  "/setreward/" +
  record.id +
  "?key=" +
  record.key +
  "&context=CONTEXT&action=ACTION&reward=REWARD";
const setRewardQueryB = record =>
  store.serverurl +
  "/setreward/" +
  record.id +
  "?key=" +
  record.key +
  "&advice_id=ADVICE_ID&reward=REWARD";

export const ExpEdit = props => (
  <Edit title={<PostTitle />} {...props}>
    <TabbedForm
      {...props}
      validate={validateExpCreation}
      redirect={false}
      submitOnEnter={true}
    >
      <FormTab label="Settings" {...props}>
        <TextInput
          name="name"
          {...props}
          label="Name of the experiment"
          source="name"
          validate={[required]}
        />
        <TextField name="id" {...props} source="id" />
        <TextField name="key" {...props} source="key" />

        <DefaultOptionsField {...props} name="field" />
        <CodeMirrorInput
          {...props}
          name="get_context"
          label="Get context"
          source="get_context"
          options={{ rows: 2 }}
        />
        <CodeMirrorInput
          {...props}
          name="get_action"
          label="Get action"
          source="get_action"
          options={{ rows: 2 }}
        />

        <FunctionField
          label="Example get action query"
          render={getActionQuery}
        />

        <CodeMirrorInput
          {...props}
          name="get_reward"
          label="Get reward"
          source="get_reward"
          options={{ rows: 2 }}
        />
        <CodeMirrorInput
          {...props}
          name="set_reward"
          label="Set reward"
          source="set_reward"
          options={{ rows: 2 }}
        />

        <DependentInput dependsOn="advice_id" resolve={checkCustomConstraint}>
          <FunctionField
            label="Example set reward query"
            render={setRewardQueryB}
          />
        </DependentInput>

        <DependentInput
          dependsOn="advice_id"
          resolve={checkCustomConstraintInverse}
        >
          <FunctionField
            label="Example set reward query"
            render={setRewardQueryA}
          />
        </DependentInput>

        <BooleanInput
          label="Store theta every hour?"
          source="hourly_theta"
          parse={truthyParse}
          format={truthyFormat}
        />
        <BooleanInput
          label="Return an advice_id?"
          source="advice_id"
          parse={truthyParse}
          format={truthyFormat}
        />

        <DependentInput dependsOn="advice_id" resolve={checkCustomConstraint}>
          <NumberInput
            label="Delta hours"
            source="delta_hours"
            step={1}
            validate={[required,number, minValue(0), maxValue(99999)]}

          />

          <LongTextInput
            validate={[required]}
            name="default_reward"
            label={
              "Default reward as a Python dict, for example \u007b\u0022\u0076\u0061\u006c\u0075\u0065\u0022\u003a\u0022\u0030\u0022\u007d"
            }
            source="default_reward"
            options={{ multiLine: true, rows: 2 }}
          />
        </DependentInput>
        <br />
        <br />
      </FormTab>
      <FormTab label="Simulate" name="Simulate">
        <SimulateButton name="simulationbutton" {...props} />
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

export const ExpCreate = props => (
  <Create {...props}>
    <SimpleForm {...props}>
      <TextInput
        label="Name of the experiment"
        source="name"
        validate={[required]}
      />
      <DefaultOptionsField name="field" />
      <CodeMirrorInput
        {...props}
        name="get_context"
        label="Get context"
        source="get_context"
        options={{ rows: 2 }}
      />
      <CodeMirrorInput
        {...props}
        name="get_action"
        label="Get action"
        source="get_action"
        options={{ rows: 2 }}
      />
      <CodeMirrorInput
        {...props}
        name="get_reward"
        label="Get reward"
        source="get_reward"
        options={{ rows: 2 }}
      />
      <CodeMirrorInput
        {...props}
        name="set_reward"
        label="Set reward"
        source="set_reward"
        options={{ rows: 2 }}
      />
      <BooleanInput
        label="Store theta every hour?"
        defaultValue="False"
        source="hourly_theta"
        parse={truthyParse}
        format={truthyFormat}
      />
      <BooleanInput
        label="Return an advice_id?"
        defaultValue="False"
        source="advice_id"
        parse={truthyParse}
        format={truthyFormat}
      />
      <DependentInput dependsOn="advice_id" resolve={checkCustomConstraint}>
        <NumberInput
          label="Delta hours"
          source="delta_hours"
          step={1}
          validate={[required]}
        />
        <LongTextInput
          validate={[required]}
          name="default_reward"
          label={
            "Default reward as a Python dict, for example \u007b\u0022\u0076\u0061\u006c\u0075\u0065\u0022\u003a\u0022\u0030\u0022\u007d"
          }
          source="default_reward"
        />
      </DependentInput>
      <br />
      <br />
    </SimpleForm>
  </Create>
);

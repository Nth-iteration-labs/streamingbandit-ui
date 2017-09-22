// in src/CodeMirrorInput.js

import debounce from 'lodash.debounce';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Labeled } from 'admin-on-rest';

var CodeMirror = require('react-codemirror');

require('codemirror/mode/javascript/javascript');
require('codemirror/mode/python/python');
require('codemirror/addon/display/autorefresh');

const CodeMirrorInput = ({
  id,
  disabled,
  label,
  name,
  input: {
    value,
    onChange
  },
  config
}) => (
		<CodeMirror     
			id={id}
			value={value} 
			options={{lineNumbers: true,autoRefresh:true,styleActiveLine: true,mode: 'python'}} 
			onChange={e => {
				onChange(e)
			}}
		/>
)

CodeMirrorInput.propTypes = {
  addField: PropTypes.bool.isRequired,
  addLabel: PropTypes.bool.isRequired,
  input: PropTypes.object,
  label: PropTypes.string,
  options: PropTypes.object,
  source: PropTypes.string,
  config: PropTypes.object
}

CodeMirrorInput.defaultProps = {
  addField: true,
  addLabel: true,
  options: {lineNumbers: true,autoRefresh:true,styleActiveLine: true,mode: 'python'},
  record: {}
}

export default CodeMirrorInput;


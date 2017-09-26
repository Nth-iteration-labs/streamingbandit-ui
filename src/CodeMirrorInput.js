// in src/CodeMirrorInput.js

import debounce from 'lodash.debounce';
import React from 'react';
import PropTypes from 'prop-types';
import CodeMirror from 'react-codemirror2'

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
			value={value} 
			options={{lineNumbers: true,autoRefresh:true,viewportMargin: 0,mode: 'python'}} 
			//onChange={debounce (e => {onChange(e)},300)}
			onChange={debounce ((editor, metadata, value) => {onChange(value)},300)}
			onSet={(editor, value) => {/*console.log('onSet', {value}*/}}
			ref={el => this.value = el}
		/>
)

CodeMirrorInput.propTypes = {
  addField: PropTypes.bool.isRequired,
  addLabel: PropTypes.bool.isRequired,
  input: PropTypes.object,
  label: PropTypes.string,
  options: PropTypes.object,
  source: PropTypes.string,
  config: PropTypes.object,
  value: PropTypes.string,
}

CodeMirrorInput.defaultProps = {
  addField: true,
  addLabel: true,
  options: {lineNumbers: true,autoRefresh:true,styleActiveLine: true,mode: 'python'},
  record: {}
}

export default CodeMirrorInput;
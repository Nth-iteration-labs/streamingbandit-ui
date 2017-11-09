import debounce from "lodash.debounce";
import React from "react";
import PropTypes from "prop-types";
import CodeMirror from "react-codemirror2";

require("codemirror/mode/javascript/javascript");
require("codemirror/mode/python/python");
require("codemirror/addon/display/autorefresh");

const CodeMirrorInput = ({
  id,
  disabled,
  label,
  name,
  input: { value, onChange },
  config
}) => (
  <CodeMirror
    value={value}
    options={{
      indentUnit: 4,
      insertSoftTab: true,
      extraKeys: { Tab: function(cm) { var spaces = Array(cm.getOption("indentUnit") + 1).join(" "); cm.replaceSelection(spaces); } },
      lineNumbers: true,
      autoRefresh: true,
      viewportMargin: 0,
      mode: "python"
    }}
    onChange={debounce((editor, metadata, value) => {
      onChange(value);
    }, 300)}
    ref={el => (this.value = el)}
  />
);

CodeMirrorInput.propTypes = {
  addField: PropTypes.bool.isRequired,
  addLabel: PropTypes.bool.isRequired,
  input: PropTypes.object,
  label: PropTypes.string,
  options: PropTypes.object,
  source: PropTypes.string,
  config: PropTypes.object,
  value: PropTypes.string
};

CodeMirrorInput.defaultProps = {
  addField: true,
  addLabel: true,
  options: {
    lineNumbers: true,
    autoRefresh: true,
    styleActiveLine: true,
    mode: "python"
  },
  record: {}
};

export default CodeMirrorInput;

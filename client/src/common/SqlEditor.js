import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-min-noconflict/ext-searchbox';
import Measure from 'react-measure';
import useAppContext from '../utilities/use-app-context';
require(`ace-builds/src-noconflict/mode-sql`);
require(`ace-builds/src-noconflict/theme-sqlserver`);

const noop = () => {};

function SqlEditor({ onChange, readOnly, value, onSelectionChange }) {
  const { config } = useAppContext();
  const [dimensions, setDimensions] = useState({ width: -1, height: -1 });
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    if (editor && onChange) {
      // augment the built-in behavior of liveAutocomplete
      // built-in behavior only starts autocomplete when at least 1 character has been typed
      // In ace the . resets the prefix token and clears the completer
      // In order to get completions for 'sometable.' we need to fire the completer manually
      editor.commands.on('afterExec', (e) => {
        if (e.command.name === 'insertstring' && /^[\w.]$/.test(e.args)) {
          if (e.args === '.') {
            editor.execCommand('startAutocomplete');
          }
        }
      });

      editor.session.setUseWrapMode(Boolean(config.editorWordWrap));
    }
  }, [editor, onChange, config]);

  const handleSelection = (selection) => {
    if (editor && editor.session) {
      const selectedText = editor.session.getTextRange(selection.getRange());
      onSelectionChange(selectedText);
    }
  };

  const { width, height } = dimensions;

  const highlightActiveLine = true;
  const showGutter = true;
  const showPrintMargin = true;

  const setOptions = {
    useWorker: true,
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    enableSnippets: false,
    showLineNumbers: true,
    tabSize: 2,
  };

  return (
    <Measure
      bounds
      onResize={(contentRect) => setDimensions(contentRect.bounds)}
    >
      {({ measureRef }) => (
        <div ref={measureRef} className="h-100 w-100">
          <AceEditor
            editorProps={{ $blockScrolling: Infinity }}
            focus={!readOnly}
            height={height + 'px'}
            highlightActiveLine={highlightActiveLine}
            mode="sql"
            name="query-ace-editor"
            onChange={onChange || noop}
            onLoad={(editor) => setEditor(editor)}
            onSelectionChange={handleSelection}
            readOnly={readOnly}
            setOptions={setOptions}
            showGutter={showGutter}
            showPrintMargin={showPrintMargin}
            theme="sqlserver"
            value={value}
            width={width + 'px'}
          />
        </div>
      )}
    </Measure>
  );
}

SqlEditor.propTypes = {
  onChange: PropTypes.func,
  onSelectionChange: PropTypes.func,
  readOnly: PropTypes.bool,
  value: PropTypes.string,
};

SqlEditor.defaultProps = {
  onSelectionChange: () => {},
  readOnly: false,
  value: '',
};

export default React.memo(SqlEditor);

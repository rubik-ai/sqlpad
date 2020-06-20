import React, { useCallback } from 'react';
import SqlEditor from '../common/SqlEditor';
import { handleQuerySelectionChange, setQueryState } from '../stores/queries';
import { useActions, useStoreState } from '../stores/unistore-hooks';

function mapStateToProps(state) {
  return {
    value: state.query && state.query.queryText,
  };
}

const actions = {
  setQueryState,
  handleQuerySelectionChange,
};

function QueryEditorSqlEditor() {
  const { setQueryState, handleQuerySelectionChange } = useActions(actions);
  const { value } = useStoreState(mapStateToProps);

  const onChange = useCallback((value) => setQueryState('queryText', value), [
    setQueryState,
  ]);

  return (
    <div style={{ padding: 4, height: '100%', width: '100%' }}>
      <SqlEditor
        value={value || ''}
        onChange={onChange}
        onSelectionChange={handleQuerySelectionChange}
      />
    </div>
  );
}

export default QueryEditorSqlEditor;

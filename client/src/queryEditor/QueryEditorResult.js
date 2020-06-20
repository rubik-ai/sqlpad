import React from 'react';
import QueryResultDataTable from '../common/QueryResultContainer.js';
import { useStoreState } from '../stores/unistore-hooks';

function ConnectedQueryEditorResult(props) {
  const state = useStoreState(['isRunning', 'queryError', 'queryResult']);
  return <QueryResultDataTable {...props} {...state} />;
}

export default ConnectedQueryEditorResult;

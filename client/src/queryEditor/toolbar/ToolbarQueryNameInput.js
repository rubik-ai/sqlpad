import React from 'react';
import Input from '../../common/Input';
import { setQueryState } from '../../stores/queries';
import { useActions, useStoreState } from '../../stores/unistore-hooks';

function mapStateToProps(state) {
  return {
    queryName: state.query && state.query.name,
    showValidation: state.showValidation,
  };
}

const actions = (store) => ({
  setQueryState,
});

function ToolbarQueryNameInput() {
  const { queryName, showValidation } = useStoreState(mapStateToProps);
  const { setQueryState } = useActions(actions);

  const error = showValidation && !queryName.length;

  return (
    <Input
      error={error}
      style={{ width: 260 }}
      placeholder="Query name"
      value={queryName}
      onChange={(e) => setQueryState('name', e.target.value)}
    />
  );
}

export default React.memo(ToolbarQueryNameInput);

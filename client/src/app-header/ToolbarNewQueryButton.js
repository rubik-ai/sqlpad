import React from 'react';
import Button from '../common/Button';
import { resetNewQuery } from '../stores/queries';
import { useActions } from '../stores/unistore-hooks';

const actions = {
  resetNewQuery,
};

function ToolbarNewQueryButton() {
  const { resetNewQuery } = useActions(actions);
  return (
    <Button
      variant="ghost"
      to="/queries/new"
      tooltip="New query"
      onClick={() => resetNewQuery()}
    >
      New
    </Button>
  );
}

export default React.memo(ToolbarNewQueryButton);

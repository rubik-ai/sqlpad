import React from 'react';
import Button from '../../common/Button';
import { connectConnectionClient } from '../../stores/connections';
import { runQuery } from '../../stores/queries';
import { useActions, useStoreState } from '../../stores/unistore-hooks';

function mapStateToProps(state) {
  const { isRunning } = state;
  return {
    isRunning,
  };
}

const actions = (store) => ({
  connectConnectionClient: connectConnectionClient(store),
  runQuery: runQuery(store),
});

function ToolbarRunButton() {
  const { isRunning } = useStoreState(mapStateToProps);
  const { connectConnectionClient, runQuery } = useActions(actions);
  return (
    <Button
      variant="primary"
      onClick={async () => {
        await connectConnectionClient();
        runQuery();
      }}
      disabled={isRunning}
    >
      Run
    </Button>
  );
}

export default React.memo(ToolbarRunButton);

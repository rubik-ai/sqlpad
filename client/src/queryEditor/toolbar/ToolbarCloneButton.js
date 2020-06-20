import CopyIcon from 'mdi-react/ContentCopyIcon';
import React from 'react';
import IconButton from '../../common/IconButton';
import { handleCloneClick } from '../../stores/queries';
import { useActions, useStoreState } from '../../stores/unistore-hooks';

function mapStateToProps(state) {
  return {
    queryId: state.query && state.query.id,
  };
}

const actions = { handleCloneClick };

function ToolbarCloneButton() {
  const { queryId } = useStoreState(mapStateToProps);
  const { handleCloneClick } = useActions(actions);

  const cloneDisabled = !queryId;

  return (
    <IconButton
      tooltip="Clone"
      onClick={handleCloneClick}
      disabled={cloneDisabled}
    >
      <CopyIcon />
    </IconButton>
  );
}

export default React.memo(ToolbarCloneButton);

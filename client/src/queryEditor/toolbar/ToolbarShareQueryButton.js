import PrivateIcon from 'mdi-react/AccountIcon';
import SharedIcon from 'mdi-react/AccountMultipleIcon';
import React from 'react';
import IconButton from '../../common/IconButton';
import { setQueryState } from '../../stores/queries';
import { useActions, useStoreState } from '../../stores/unistore-hooks';

function mapStateToProps(state) {
  const acl = state.query.acl || [];
  return {
    shared: acl.length > 0,
  };
}
const actions = (store) => ({
  setQueryState,
});

function ToolbarShareQueryButton() {
  const { shared } = useStoreState(mapStateToProps);
  const { setQueryState } = useActions(actions);

  function handleClick() {
    setQueryState(
      'acl',
      shared ? [] : [{ groupId: '__EVERYONE__', write: true }]
    );
  }

  return (
    <IconButton
      tooltip={shared ? 'Query is shared' : 'Query is private'}
      onClick={handleClick}
    >
      {shared ? <SharedIcon /> : <PrivateIcon />}
    </IconButton>
  );
}

export default React.memo(ToolbarShareQueryButton);

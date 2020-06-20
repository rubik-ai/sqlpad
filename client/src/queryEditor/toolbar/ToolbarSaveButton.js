import UnsavedIcon from 'mdi-react/ContentSaveEditIcon';
import SaveIcon from 'mdi-react/ContentSaveIcon';
import React from 'react';
import IconButton from '../../common/IconButton';
import { saveQuery } from '../../stores/queries';
import { useActions, useStoreState } from '../../stores/unistore-hooks';

function mapStateToProps(state) {
  return {
    isSaving: state.isSaving,
    unsavedChanges: state.unsavedChanges,
  };
}

const actions = (store) => ({
  saveQuery: saveQuery(store),
});
function ToolbarSaveButton() {
  const { isSaving, unsavedChanges } = useStoreState(mapStateToProps);
  const { saveQuery } = useActions(actions);
  return (
    <IconButton tooltip="Save" onClick={() => saveQuery()} disabled={isSaving}>
      {unsavedChanges ? <UnsavedIcon /> : <SaveIcon />}
    </IconButton>
  );
}

export default React.memo(ToolbarSaveButton);

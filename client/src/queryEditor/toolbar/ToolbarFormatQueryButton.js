import FormatIcon from 'mdi-react/FormatAlignLeftIcon';
import React from 'react';
import IconButton from '../../common/IconButton';
import { formatQuery } from '../../stores/queries';
import { useActions } from '../../stores/unistore-hooks';

const actions = (store) => ({
  formatQuery,
});

function ToolbarFormatQueryButton() {
  const { formatQuery } = useActions(actions);
  return (
    <IconButton tooltip="Format" onClick={formatQuery}>
      <FormatIcon />
    </IconButton>
  );
}

export default React.memo(ToolbarFormatQueryButton);

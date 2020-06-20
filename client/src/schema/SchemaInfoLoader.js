import { useEffect } from 'react';
import { useStoreState } from '../stores/unistore-hooks';
import useSchemaState from '../stores/use-schema-state';

function mapStateToProps(state) {
  return {
    connectionId: state.selectedConnectionId,
  };
}

/**
 * Instead of loading schema on selection,
 * this is acts as a listener-as-a-component for schema changes.
 * This is not in the schema sidebar,
 * because sidebar could be hidden and this is an application-level need
 * @param {*} props
 */
function SchemaInfoLoader() {
  const { connectionId } = useStoreState(mapStateToProps);
  const { loadSchemaInfo } = useSchemaState();

  useEffect(() => {
    if (connectionId) {
      loadSchemaInfo(connectionId);
    }
  }, [connectionId, loadSchemaInfo]);

  return null;
}

export default SchemaInfoLoader;

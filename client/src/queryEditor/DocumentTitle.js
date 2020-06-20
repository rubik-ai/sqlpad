import { useEffect } from 'react';
import { useStoreState } from '../stores/unistore-hooks';

/**
 * This component isolates the work of updating the document title on query name changes.
 * This prevents the main QueryEditor component from needing to render on name change.
 * Once unistore has a hooks interface this can become a custom hook
 * @param {object} props
 */
function DocumentTitle({ queryId }) {
  const { title } = useStoreState((state) => {
    const queryName = state.query && state.query.name;
    return {
      title: queryId === 'new' ? 'New query' : queryName,
    };
  });

  useEffect(() => {
    document.title = title;
  }, [title]);

  return null;
}

export default DocumentTitle;

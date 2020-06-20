import keymaster from 'keymaster';
import { useEffect } from 'react';
import { connectConnectionClient } from '../stores/connections';
import { formatQuery, runQuery, saveQuery } from '../stores/queries';
import { useActions } from '../stores/unistore-hooks';

const actions = (store) => ({
  connectConnectionClient: connectConnectionClient(store),
  formatQuery,
  runQuery: runQuery(store),
  saveQuery: saveQuery(store),
});

function Shortcuts() {
  const {
    connectConnectionClient,
    formatQuery,
    runQuery,
    saveQuery,
  } = useActions(actions);

  useEffect(() => {
    // keymaster doesn't fire on input/textarea events by default
    // since we are only using command/ctrl shortcuts,
    // we want the event to fire all the time for any element
    keymaster.filter = () => true;
    keymaster('ctrl+s, command+s', (e) => {
      saveQuery();
      return false;
    });
    keymaster('ctrl+return, command+return', (e) => {
      connectConnectionClient().then(() => runQuery());
      return false;
    });
    keymaster('shift+return', (e) => {
      formatQuery();
      return false;
    });

    return () => {
      keymaster.unbind('ctrl+return, command+return');
      keymaster.unbind('ctrl+s, command+s');
      keymaster.unbind('shift+return');
    };
  }, [saveQuery, runQuery, connectConnectionClient, formatQuery]);

  return null;
}

export default Shortcuts;

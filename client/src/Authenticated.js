import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import useSWR from 'swr';
import initApp from './stores/initApp';
import { useActions, useStoreState } from './stores/unistore-hooks';
import useAppContext from './utilities/use-app-context';

const actions = { initApp };

function Authenticated({ children }) {
  const { initialized } = useStoreState('initialized');
  const { initApp } = useActions(actions);

  const { config, currentUser } = useAppContext();

  let { data: connections } = useSWR('/api/connections');

  useEffect(() => {
    if (config && !initialized && connections) {
      initApp(config, connections);
    }
  }, [initApp, config, connections, initialized]);

  if (!config) {
    return null;
  }

  if (config && !currentUser) {
    return <Redirect to={{ pathname: '/signin' }} />;
  }

  if (!initialized) {
    return null;
  }

  return children;
}

export default Authenticated;

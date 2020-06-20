import './css/reset.css';
import '@reach/dialog/styles.css';
import '@reach/menu-button/styles.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { SWRConfig } from 'swr';
import { MessageDisplayer } from './common/message';
import './css/index.css';
import './css/react-split-pane.css';
import './css/vendorOverrides.css';
import Routes from './Routes';
import { KeyStateProvider } from './stores/key-state';
import { Provider } from './stores/unistore-hooks';
import unistoreStore from './stores/unistoreStore';
import swrFetcher from './utilities/swr-fetcher';

ReactDOM.render(
  <Provider value={unistoreStore}>
    <KeyStateProvider>
      <SWRConfig
        value={{
          fetcher: swrFetcher,
        }}
      >
        <Routes />
        <MessageDisplayer />
      </SWRConfig>
    </KeyStateProvider>
  </Provider>,
  document.getElementById('root')
);

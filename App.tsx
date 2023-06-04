import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import LoadApp from 'core';
import store, { persistor } from 'store';

export default function App(): JSX.Element {
  return (
    <Provider {...{ store }}>
      <PersistGate loading={null} {...{ persistor }}>
        <LoadApp />
      </PersistGate>
    </Provider>
  );
}

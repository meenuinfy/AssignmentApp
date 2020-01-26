import React from 'react';
import {Provider} from 'react-redux';
import AppNavigator from './navigation/AppNavigtor';
import Store from './store';
import EStyleSheet from 'react-native-extended-stylesheet';

const App = () => (
  <Provider store={Store}>
    <AppNavigator />
  </Provider>
);

EStyleSheet.build({
  // always call EStyleSheet.build() even if you don't use global variables!
  $textColor: '#0275d8',
});

export default App;

import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import GenerateScreen from '../screens/GenerateScreen';
import SavedScreen from '../screens/SavedScreen';

const TabNavigator = createBottomTabNavigator({
  Generate: GenerateScreen,
  Saved: SavedScreen,
});

export default createAppContainer(TabNavigator);

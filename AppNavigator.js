import { createStackNavigator } from 'react-navigation';
import Home from './Home';
import Friends from './Friends';
import Game from './Game';

const AppNavigator = createStackNavigator({
  Home: { screen: Home },
  Friends: { screen: Friends },
  Game: { screen: Game }
});

export default AppNavigator;
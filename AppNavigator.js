import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import Home from './Home';
import Friends from './Friends';
import Game from './Game';
import LoginPage from './LoginPage';


const LoginNavigator = createStackNavigator({
  Login: {
    screen: LoginPage,
    navigationOptions: {
      title: "Login"
    }
  }
})

const MainNavigator = createStackNavigator({
  Home: { screen: Home },
  Friends: { screen: Friends },
  Game: { screen: Game }
});

export const MakeAppNavigator = (isLoggedIn) => {
  return createSwitchNavigator(
    {
      LoginNavigator:{
        screen: LoginNavigator
      },
      MainNavigator:{
        screen: MainNavigator
      },
      initialRouteName: isLoggedIn ? "MainNavigator" : "LoginNavigator" 
    }
  );

}

//export default MakeAppNavigator;
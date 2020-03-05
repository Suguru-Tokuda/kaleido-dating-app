import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Provider } from 'react-redux';
import Login from './src/screens/login';
import Swipe from './src/screens/swipe';
import Messages from './src/screens/messages';
import Search from './src/screens/search';
import Settings from './src/screens/settings';
import ProfileModal from './src/screens/settings/profileModal';
import store from './src/store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ButtomTabBar from './src/components/navigation/bottomTabBar';

const Stack = createStackNavigator();
const SettingsRootStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const RootSettings = () => {
  return (
    <SettingsRootStack.Navigator mode="modal" headerMode="float">
      <SettingsRootStack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
      <SettingsRootStack.Screen name="ProfileModal" component={ProfileModal} options={{ headerShown: false, headerLeft: null }} />
    </SettingsRootStack.Navigator>
  )
}

function Home() {
  return (
    <Tabs.Navigator
      tabBar={props => <ButtomTabBar {...props}
       />}
    >
      <Tabs.Screen name="Swipe" component={Swipe} />
      <Tabs.Screen name="Search" component={Search} />
      <Tabs.Screen name="Messages" component={Messages} />
      <Tabs.Screen name="RootSettings" component={RootSettings} options={{ tabBarVisible: false }} hideTabBar={this.hideTabBar} />
    </Tabs.Navigator>
  );
}


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator 
          screenOptions={{ headerShown: false, gestureEnabled: false }}
          
          >
            <Stack.Screen name="Login" component={Login}></Stack.Screen>
            <Stack.Screen name="Home" component={Home} props={this.props}></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
};

export default App;
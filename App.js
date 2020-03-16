import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Login from './src/screens/login';
import Swipe from './src/screens/swipe';
import Messages from './src/screens/messages';
import Search from './src/screens/search';
import Settings from './src/screens/settings';
import ProfileModal from './src/screens/settings/profileModal';

import Step1 from './src/screens/user-registration/step-1';
import RacePreferenceCheckBoxes from './src/screens/user-registration/racePreferenceCheckBoxes';

import store from './src/store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ButtomTabBar from './src/components/navigation/bottomTabBar';

const Stack = createStackNavigator();
const SettingsRootStack = createStackNavigator();
const UserRegistrationStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <Tab.Navigator tabBar={props => <ButtomTabBar {...props}/>}>
      <Tab.Screen name="Swipe" component={Swipe} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Messages" component={Messages} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
} 

const Home = () => {
  return (
    <SettingsRootStack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
      <SettingsRootStack.Screen name="Main" component={Main} />
      <SettingsRootStack.Screen name="ProfileModal" component={ProfileModal} />
    </SettingsRootStack.Navigator>
  )
}

const UserRegistration = () => {
  return (
    <UserRegistrationStack.Navigator mode="card" screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <UserRegistrationStack.Screen name="Step1" component={Step1} />
      <UserRegistrationStack.Screen name="RacePreferenceCheckBoxes" component={RacePreferenceCheckBoxes} />
    </UserRegistrationStack.Navigator>
  );
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator mode="card" screenOptions={{ headerShown: false, gestureEnabled: false }}>
            <Stack.Screen name="UserRegistration" component={UserRegistration}></Stack.Screen>
            <Stack.Screen name="Login" component={Login}></Stack.Screen>
            <Stack.Screen name="Home" component={Home}></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
};

export default App;
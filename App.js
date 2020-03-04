import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Login from './src/screens/login';
import Swipe from './src/screens/swipe';
import Messages from './src/screens/messages';
import Search from './src/screens/search';
import Settings from './src/screens/settings';
import store from './src/store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ButtomTabBar from './src/components/navigation/bottomTabBar';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

function Home() {
  return (
    <Tabs.Navigator
      tabBar={props => <ButtomTabBar {...props} />}
      // screenOptions={({ route }) => ({
      //   tabBarIcon: ({ focused, color, size }) => {
      //     let icon;
      //     if (route.name === 'Swipe') {
      //       icon = <MaterialIcon name='cards-outline' size={size} color={color} />;
      //     } else if (route.name === 'Search') {
      //       icon = <FeatherIcon name='search' size={size} color={color} />;
      //     } else if (route.name === 'Messages') {
      //       icon = <FeatherIcon name='message-circle' size={size} color={color} />;
      //     } else if (route.name === 'Settings') {
      //       icon = <FeatherIcon name='settings' size={size} color={color} />;
      //     }
      //     return icon;
      //   },
      // })}
      // tabBarOptions={{
      //   activeTintColor: 'purple',
      //   inactiveTintColor: 'gray',
      //   showLabel: false
      // }}
    >
      <Tabs.Screen name="Swipe" component={Swipe} />
      <Tabs.Screen name="Search" component={Search} />
      <Tabs.Screen name="Messages" component={Messages} />
      <Tabs.Screen name="Settings" component={Settings} />
    </Tabs.Navigator>
  );
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login}></Stack.Screen>
            <Stack.Screen name="Home" component={Home}></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
};

export default App;
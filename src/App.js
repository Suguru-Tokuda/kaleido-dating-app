import { createAppContainer, createStackNavigator } from 'react-navigation';

const App = createStackNavigator(
    {
        Login: {screen: Login},
        HomeTabNavigation: {screen: HomeTabNavigation},
        ChatList: {screen: ChatList},
        ChatScreen: {screen: ChatScreen},
        UserDetails: {screen: UserDetails},
        Settings: {screen: Settings},
        EditProfile: {screen: EditProfile},
        CurrentWork: {screen: CurrentWork},
        PhotoCardDetails: {screen: PhotoCardDetails}
    },
    {
        index: 0,
        initialRouteName: "Login",
        headerMode: "none"
    }
);

export default createAppContainer(App);
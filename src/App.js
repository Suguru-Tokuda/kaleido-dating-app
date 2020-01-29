import { createAppContainer, createStackNavigator } from 'react-navigation';
import Login from './secreens/Login';
import HomeTabNavigation from './screens/Home/tabNavigation';
import ChatList from './screens/ChatList';
import ChatScreen from './screens/ChatScreen';
import UserDetails from './screens/UserDetails';
import Settings from './screens/Settings';
import EditProfile from './screens/EditProfile/editProfile';
import CurrentWork from './screens/EditProfile/currentWork';
import AddPhoto from './screens/EditProfile/addPhoto';

const App = createStackNavigator(
    {
        Login: {screen: Login},
        HomeTabNavigation: {screen: HomeTabNavigation},
        ChatList: {screen: ChatList},
        ChatScreen: {screen: ChatScreen},
        UserDetails: {screen: UserDetails},
        Settings: {screen: Settings},
        EditProfile: {screen: EditProfile},
        AddPhoto: {screen: AddPhoto},
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
import React, { Component }  from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

class BottomTabBar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { state, descriptors, navigation } = this.props;
        return (
            <View style={{ 
              flexDirection: 'row',
              backgroundColor: 'white'
               }}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label = options.tabBarLabel !== undefined
                                    ? options.tabBarLabel
                                    : options.title !== undefined
                                    ? options.title
                                    : route.name;
                    let icon;
                    const isFocused = state.index === index;
                    const color = isFocused ? 'purple' : 'gray';
                    if (route.name === 'Swipe') {
                      icon = <MaterialIcon style={{ alignSelf: 'center', marginTop: 20}} name='cards-outline' size={25} color={color} />;
                    } else if (route.name === 'Search') {
                      icon = <FeatherIcon style={{ alignSelf: 'center', marginTop: 20}} name='search' size={25} color={color} />;
                    } else if (route.name === 'Messages') {
                      icon = <FeatherIcon style={{ alignSelf: 'center', marginTop: 20}} name='message-circle' size={25} color={color} />;
                    } else if (route.name === 'Settings') {
                      icon = <FeatherIcon style={{ alignSelf: 'center', marginTop: 20}} name='user' size={25} color={color} />;
                    }
                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key
                        });
                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key
                        });
                    };

                    return (
                        <TouchableOpacity
                            accessibilityRole="button"
                            accessibilityStates={isFocused ? ['selected']: []}
                            accessibilityLabel={options.tabBarAccessbilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={{ 
                              flex: 1,
                              height: 80,
                              borderTopColor: 'black'
                            }}
                        >
                          {icon}
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    }
}

export default BottomTabBar;
import React, { Component } from 'react';
import { Picker, Dimenstions, Button, TouchableOpacity, Keyboard } from 'react-native';
import { Container, Content, Text, View, Input, Item, Label, Form, Textarea, Button as ReactNativeButton } from 'native-base';
import * as Progress from 'react-native-progress';
import { connect } from 'react-redux';

const deviceHeight = Dimensions.get('window').height;

class Srep3 extends Component {
    state = {
        drinkingID: 0,
        drinkingOptions: [

        ],
        kids: 0,
        kidsOptionID: 0,
        kidsOptions: [
            { kidsID: 1, label: `Don't have kids.`},
            { kidsID: 2, label: `Don't want kids.`},
            { kidsID: 3, label: `Have kids.`}
        ],
    };

    
}
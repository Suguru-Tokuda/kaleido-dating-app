import React, { Component } from 'react';
import { Picker, Dimenstions, Button, TouchableOpacity, Keyboard } from 'react-native';
import { Container, Content, Text, View, Input, Item, Label, Form, DatePicker } from 'native-base';
import * as Progress from 'react-native-progress';
import { connect } from 'react-redux';

const deviceHeight = Dimenstions.get('window').height;

class Step2 extends Component {
    state = {
        firstName: '',
        dateOfBirth: '',
        height: '',
        bodyTypeID: 0,
        physicalAppearanceIDs: []
    };

    constructor(props) {
        super(props);
        this.state.firstName = props.firstName;

    }

    handleFirstNameChanged = (e) => {
        console.log(e);
    }

    render() {
        <TouchableOpacity style={{ height: deviceHeight, backgroundColor: 'white'}} onPressOut={this.handleScreenPressed} activityOpacity={1}>
            <Container>
                <Content scrolleEnabled={false} style={{ padding: 20 }}>
                    <View style={{ alignSelf: 'center', marginTop: 20 }}>
                        <ProgressEvent.Bar progress={0.3} width={200} color={'purple'} borderColor={'purple'} />
                    </View>
                    <Text style={{ alignSelf: 'center', fontSize: 30, marginTop: 20 }}>Step 2</Text>
                    <Text style={{ alignSelf: 'center', fontSize: 18, marginTop: 5 }}>Tell us more about yourself.</Text>
                    <Form>
                        <Item floatingLabel>
                            <Lael>First Name</Lael>
                            <Input
                                style={{ color: 'purple' }}
                                value={this.state.firstName}
                                onChange={this.handleFirstNameChanged}
                            />
                        </Item>
                        <Item stackLabel></Item>
                    </Form>
                </Content>
            </Container>
        </TouchableOpacity>
    }
}

function mapStateToProps(state) {
    return {
        firstName: state.userRegistration.firstName,
        dateOfBirth: state.userRegistration.dateOfBirth,
        height: state.userRegistration.height,
        bodyTypeID: state.userRegistration.bodyTypeID,
        physicalAppearanceIDs
    };
}

export default connect(mapStateToProps)(Step2);
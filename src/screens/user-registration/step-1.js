import React, { Component } from 'react';
import { Picker, Dimensions, Button, TextInput, Keyboard } from 'react-native';
import { Container, Content, Text, View, InputGroup, Input } from 'native-base';
import { connect } from 'react-redux';

var deviceHeight = Dimensions.get('window').height;

class Step1 extends Component {
    state = {
        raceIDs: [],
        races: [
            {raceID: 1, label: 'White'},
            {raceID: 2, label: 'Black'},
            {raceID: 3, label: 'Asian'},
            {raceID: 4, label: 'Indian'},
            {raceID: 5, label: 'Mexican'},
        ],
        selectedGenderID: 1,
        genders: [
            {genderID: 1, label: 'Male'},
            {genderID: 2, label: 'Female'},
        ],
        showPicker: false
    }

    renderPickerItems() {
        const { genders } = this.state;
        if (genders.length > 0) {
            return genders.map(gender => {
                return <Picker.Item label={gender.label} value={gender.genderID} />
            });
        } else {
            return null;
        }
    }

    getGenderValue = () => {
        const { selectedGenderID, genders } = this.state;
        if (genders.length > 0) {
            for (const gender of genders) {
                if (gender.genderID === selectedGenderID) {
                    console.log(gender.label);
                    return gender.label;
                }
            }
        }
        return '';
    }

    handleShowPickerBtnPressed = () => {
        Keyboard.dismiss();
        let showPicker = this.state.showPicker;
        showPicker = !showPicker;
        this.setState({ showPicker });
    }

    render() {
        return (
            <View style={{ height: deviceHeight, backgroundColor: 'white' }}>
                <Container>
                    <Content scrollEnabled={true}>
                        <Text style={{ alignSelf: 'center', fontSize: 30}}>Step 1</Text>
                        <Text style={{ alignSelf: 'center', fontSize: 18, marginTop: 5}}>Self introduction.</Text>
                        <Text style={{ margin: 15, height: 20, marginBottom: 0, fontSize: 15}}>I identify as</Text>
                        <InputGroup borderType="regular">
                            <Input 
                                style={{ color: 'purple', marginLeft: 15 }}
                                value={this.getGenderValue()}
                                onFocus={this.handleShowPickerBtnPressed} 
                            />
                        </InputGroup>
                        <Text style={{ margin: 15, height: 20, marginBottom: 0, fontSize: 15}}>Race</Text>
                    </Content>
                </Container>
                {this.state.showPicker === true && (
                <View style={{ backgroundColor: 'white', position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                    <View style={{ borderTopWidth: 0.5, borderBottomWidth: 0.5, borderBottomColor: '#D3D3D3', borderTopColor: '#D3D3D3', alignItems: 'flex-end' }}>
                        <Button title="Done" onPress={this.handleShowPickerBtnPressed} />
                    </View>
                    <Picker 
                        selectedValue={this.state.selectedGenderID}
                        onValueChange={(itemValue) => 
                            this.setState({ selectedGenderID: itemValue })
                        }
                        >
                            {this.renderPickerItems()}
                    </Picker>
                </View>
                )}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        raceIDs: state.userRegistration.raceIDs,
        gender: state.userRegistration.race,
        raceIDsToLookFor: state.userRegistration.raceIDsToLookFor,
        genderToLookFor: state.userRegistration.genderToLookFor
    };
}

export default connect(mapStateToProps)(Step1);
// export default Step1;
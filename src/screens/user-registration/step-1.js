import React, { Component } from 'react';
import { Picker, Dimensions, Button, Keyboard } from 'react-native';
import { Container, Content, Text, View, Input, Item, Label, Form } from 'native-base';
import { connect } from 'react-redux';

var deviceHeight = Dimensions.get('window').height;

class Step1 extends Component {
    state = {
        raceIDs: [],
        selectedRaceID: 0,
        races: [
            {raceID: 1, label: 'White'},
            {raceID: 2, label: 'Black'},
            {raceID: 3, label: 'Asian'},
            {raceID: 4, label: 'Indian'},
            {raceID: 5, label: 'Mexican'}
        ],
        selectedRacePrefIDs: [],
        selectedGenderID: 1,
        genders: [
            {genderID: 1, label: 'Male'},
            {genderID: 2, label: 'Female'},
        ],
        showGenderPicker: false,
        showRacePicker: false
    }

    renderGenderPickerItems() {
        const { genders } = this.state;
        if (genders.length > 0) {
            return genders.map(gender => <Picker.Item key={`gender-picker-item ${gender.genderID}`} label={gender.label} value={gender.genderID} />);
        }
        return null;
    }

    renderGenderPicker = () => {
        if (this.state.showGenderPicker === true) {
            return (
                <View style={{ backgroundColor: 'white', position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                    <View style={{ borderTopWidth: 0.5, borderBottomWidth: 0.5, borderBottomColor: '#D3D3D3', borderTopColor: '#D3D3D3', alignItems: 'flex-end' }}>
                        <Button title="Done" onPress={this.handleShowGenderPickerBtnPressed} />
                    </View>
                    <Picker 
                        selectedValue={this.state.selectedGenderID}
                        onValueChange={(itemValue) => this.setState({ selectedGenderID: itemValue })}
                    >
                        {this.renderGenderPickerItems()}
                    </Picker>
                </View>
            );
        }
    }

    renderRacePickerItems() {
        const { races } = this.state;
        if (races.length > 0) {
            return races.map(race => <Picker.Item key={`picker-item-race: ${race.raceID}`} label={race.label} value={race.raceID} />);
        }
        return null;
    }

    renderRacePicker = () => {
        const { showRacePicker, selectedRaceID } = this.state;
        if (showRacePicker === true) {
            return (
                <View style={{ backgroundColor: 'white', position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                    <View style={{ borderTopWidth: 0.5, borderBottomWidth: 0.5, borderBottomColor: '#D3D3D3', borderTopColor: '#D3D3D3', alignItems: 'flex-end' }}>
                        <Button title="Done" onPress={this.handleShowRacePickerBtnPress} />
                    </View>
                    <Picker
                        selectedValue={selectedRaceID}
                        onValueChange={(itemValue) => this.setState({ selectedRaceID: itemValue })}>{this.renderRacePickerItems()}
                    </Picker>
                </View>
            );
        }
    }

    getGenderValue = () => {
        const { selectedGenderID, genders } = this.state;
        if (genders.length > 0) {
            for (const gender of genders) {
                if (gender.genderID === selectedGenderID) {
                    return gender.label;
                }
            }
        }
        return '';
    }

    getRaceValue = () => {
        const { selectedRaceID, races } = this.state;
        if (races.length > 0) {
            for (const race of races) {
                if (race.raceID === selectedRaceID) {
                    return race.label;
                }
            }
        }
        return '';
    }

    getRacePrefsLabel = () => {
        const { races } = this.state;
        const { racePrefIDs } = this.props;
        let retVal = '';
        races.forEach((race, i) => {
            if (racePrefIDs.indexOf(race.raceID) !== -1) {
                if (retVal.length === 0) {
                    retVal += race.label;
                } else {
                    retVal += `, ${race.label}`;
                }
            }
        });
        return retVal;
    }

    handleShowGenderPickerBtnPressed = () => {
        Keyboard.dismiss();
        let showGenderPicker = this.state.showGenderPicker;
        showGenderPicker = !showGenderPicker;
        this.setState({ showGenderPicker });
    }

    handleShowRacePickerBtnPress = () => {
        Keyboard.dismiss();
        let showRacePicker = this.state.showRacePicker;
        showRacePicker = !showRacePicker;
        this.setState({ showRacePicker });
    }

    handleRacePrefsOnFocus = () => {
        const { races } = this.state;
        const { racePrefIDs } = this.props;
        console.log(racePrefIDs);
        this.props.navigation.navigate('RacePreferenceCheckBoxes', {
            selectedRaceIDs: racePrefIDs,
            races: races
        });
    }

    render() {
        return (
            <View style={{ height: deviceHeight, backgroundColor: 'white' }}>
                <Container>
                    <Content scrollEnabled={false} style={{ padding: 20}}>
                        <Text style={{ alignSelf: 'center', fontSize: 30}}>Step 1</Text>
                        <Text style={{ alignSelf: 'center', fontSize: 18, marginTop: 5}}>Self introduction.</Text>
                        <Form>
                            <Item stackedLabel>
                                <Label>I identify as</Label>
                                <Input 
                                    style={{ color: 'purple' }}
                                    value={this.getGenderValue()}
                                    onFocus={this.handleShowGenderPickerBtnPressed} 
                                />
                            </Item>
                            <Item floatingLabel>
                                <Label>Race</Label>
                                <Input  
                                    style={{ color: 'purple'}}
                                    value={this.getRaceValue()}
                                    onFocus={this.handleShowRacePickerBtnPress}
                                />
                            </Item>
                            {this.props.racePrefIDs.length === 0 && (
                                <Item floatingLabel>
                                    <Label>Looking for</Label>
                                    <Input
                                        style={{ color: 'purple'}}
                                        onFocus={this.handleRacePrefsOnFocus}
                                        value={this.getRacePrefsLabel()}
                                    />
                                </Item>              
                            )}
                            {this.props.racePrefIDs.length > 0 && (
                                <Item stackedLabel>
                                    <Label>Looking for</Label>
                                    <Input
                                        style={{ color: 'purple'}}
                                        onFocus={this.handleRacePrefsOnFocus}
                                        value={this.getRacePrefsLabel()}
                                    />
                                </Item>              
                            )}
                        </Form>
                    </Content>
                </Container>
                {this.renderGenderPicker()}
                {this.renderRacePicker()}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        raceIDs: state.userRegistration.raceIDs,
        gender: state.userRegistration.race,
        racePrefIDs: state.userRegistration.racePrefIDs,
        genderToLookFor: state.userRegistration.genderToLookFor
    };
}

export default connect(mapStateToProps)(Step1);
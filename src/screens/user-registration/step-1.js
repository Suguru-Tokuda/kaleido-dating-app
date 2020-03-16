import React, { Component } from 'react';
import { Picker, Dimensions, Button, TouchableOpacity, Keyboard } from 'react-native';
import { Container, Content, Text, View, Input, Item, Label, Form, Badge, Button as ReactNativeButton } from 'native-base';
import * as Progress from 'react-native-progress';
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
        selectedGenderID: 0,
        genders: [
            {genderID: 1, label: 'Male'},
            {genderID: 2, label: 'Female'},
        ],
        selectedSexualOrientationID: 0,
        sexualOrientations: [
            {sexualOrientationID: 1, label: 'Straight'},
            {sexualOrientationID: 2, label: 'Bisexual'},
        ],
        showGenderPicker: false,
        showRacePicker: false,
        showSexualOrientationPicker: false
    }

    renderGenderPickerItems() {
        const { genders } = this.state;
        let retVal;
        if (genders.length > 0) {
            retVal = genders.map(gender => <Picker.Item key={`gender-picker-item-${gender.genderID}`} label={gender.label} value={gender.genderID} />);
        } else {
            retVal = null;
        }
        return retVal;
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

    renderSexualOrientationItems() {
        const { sexualOrientations } = this.state;
        if (sexualOrientations.length > 0) {
            return sexualOrientations.map(sexualOrientation => <Picker.Item key={`sexual-orientation-item-${sexualOrientation.sexualOrientationID}`} label={sexualOrientation.label} value={sexualOrientation.sexualOrientationID} />);
        }
    }

    renderSexualOrientationPicker = () => {
        if (this.state.showSexualOrientationPicker === true) {
            return (
                <View style={{ backgroundColor: 'white', position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                    <View style={{ borderTopWidth: 0.5, borderBottomWidth: 0.5, borderBottomColor: '#D3D3D3', borderTopColor: '#D3D3D3', alignItems: 'flex-end' }}>
                        <Button title="Done" onPress={this.handleShowSexualOrientationPickerBtnPress} />
                    </View>
                    <Picker
                        selectedValue={this.state.selectedSexualOrientationID}
                        onValueChange={(itemValue) => this.setState({ selectedSexualOrientationID: itemValue })}
                    >
                        {this.renderSexualOrientationItems()}
                    </Picker>
                </View>
            )
        }
    }

    renderRacePickerItems() {
        const { races } = this.state;
        let retVal;
        if (races.length > 0) {
            retVal = races.map(race => <Picker.Item key={`picker-item-race: ${race.raceID}`} label={race.label} value={race.raceID} />);
        } else {
            retVal = null;
        }
        return retVal;
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

    getSexualOrientationValue = () => {
        const { selectedSexualOrientationID, sexualOrientations } = this.state;
        if (sexualOrientations.length > 0) {
            for (const sexualOrientation of sexualOrientations) {
                if (sexualOrientation.sexualOrientationID === selectedSexualOrientationID) {
                    return sexualOrientation.label;
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

    getRacePrefBadges = () => {
        const { races } = this.state;
        const { racePrefIDs } = this.props;
        if (racePrefIDs.length > 0) {
            const badges = [];
            races.forEach((race, i) => {
                const index = racePrefIDs.indexOf(race.raceID);
                if (index !== -1) {
                    badges.push(
                    <Badge
                        key={`race-badge-${race.raceID}`}
                     style={{ 
                        backgroundColor: 'purple',
                        marginLeft: i === 0 ? 0 : 3
                        }}>
                        <Text>{race.label}</Text>
                    </Badge>
                    )
                }
            });
            return (
                <View style={{flexDirection: 'row', flexWrap: 'wrap', alignSelf: 'flex-start', marginTop: 20, marginBottom: 15}}>
                    {badges}
                </View>
            )
        } else {
            return null;
        }
    }

    handleShowGenderPickerBtnPressed = () => {
        Keyboard.dismiss();
        let showGenderPicker = this.state.showGenderPicker;
        let { selectedGenderID } = this.state;
        const { genders } = this.state;
        showGenderPicker = !showGenderPicker;
        if (selectedGenderID === 0 && showGenderPicker === true) {
            selectedGenderID = genders[0].genderID;
        }
        this.setState({ selectedGenderID, showGenderPicker, showRacePicker: false, showSexualOrientationPicker: false });
    }

    handleShowRacePickerBtnPress = () => {
        Keyboard.dismiss();
        let showRacePicker = this.state.showRacePicker;
        let { selectedRaceID } = this.state;
        const { races } = this.state;
        showRacePicker = !showRacePicker;
        if (selectedRaceID === 0 && showRacePicker === true) {
            selectedRaceID = races[0].raceID;
        }
        this.setState({ selectedRaceID, showRacePicker, showGenderPicker: false, showSexualOrientationPicker: false });
    }

    handleShowSexualOrientationPickerBtnPress = () => {
        Keyboard.dismiss();
        let showSexualOrientationPicker = this.state.showSexualOrientationPicker;
        showSexualOrientationPicker = !showSexualOrientationPicker;
        let { selectedSexualOrientationID } = this.state;
        const { sexualOrientations } = this.state;
        if (selectedSexualOrientationID === 0 && showSexualOrientationPicker === true) {
            selectedSexualOrientationID = sexualOrientations[0].sexualOrientationID;
        }
        this.setState({ selectedSexualOrientationID, showSexualOrientationPicker, showRacePicker: false, showGenderPicker: false });
    }

    handleRacePrefsOnFocus = () => {
        Keyboard.dismiss();
        const { races } = this.state;
        const { racePrefIDs } = this.props;
        this.setState({
            showGenderPicker: false,
            showRacePicker: false,
            showSexualOrientationPicker: false
        });
        this.props.navigation.navigate('RacePreferenceCheckBoxes', {
            selectedRaceIDs: racePrefIDs,
            races: races
        });
    }

    handleContentPress = () => {
        this.setState({
            showGenderPicker: false,
            showRacePicker: false,
            showSexualOrientationPicker: false
        });
    }

    getButtonDisabledValue = () => {
        const { selectedRaceID, selectedGenderID, selectedSexualOrientationID } = this.state;
        const { racePrefIDs } = this.props;
        let isValid = true;
        if (selectedRaceID === 0 || racePrefIDs.length === 0 || selectedGenderID === 0 || selectedSexualOrientationID === 0)
            isValid = false;
        return isValid;
    }

    getNextBtnStyle = () => {
        const isValid = this.getButtonDisabledValue();
        const style = {
            position: 'absolute', 
            alignSelf: 'center', 
            bottom: 20, 
            width: 200,
            backgroundColor: isValid === true ? 'purple' : 'lightgray'
        };
        return style;
    }

    render() {
        return (
            <TouchableOpacity style={{ height: deviceHeight, backgroundColor: 'white' }} onPressOut={this.handleContentPress} activeOpacity={1}>
                <Container>
                    <Content scrollEnabled={false} style={{ padding: 20}} >
                        <View style={{ alignSelf: 'center', marginTop: 20}}>
                            <Progress.Bar progress={0.0} width={200} color={'purple'} borderColor={'purple'} />
                        </View>
                        <Text style={{ alignSelf: 'center', fontSize: 30, marginTop: 20}}>Step 1</Text>
                        <Text style={{ alignSelf: 'center', fontSize: 18, marginTop: 5}}>Self introduction.</Text>
                        <Form>
                            <Item floatingLabel>
                                <Label>I identify as</Label>
                                <Input 
                                    style={{ color: 'purple' }}
                                    value={this.getGenderValue()}
                                    onFocus={this.handleShowGenderPickerBtnPressed} 
                                />
                            </Item>
                            <Item floatingLabel>
                                <Label>My Race is</Label>
                                <Input  
                                    style={{ color: 'purple'}}
                                    value={this.getRaceValue()}
                                    onFocus={this.handleShowRacePickerBtnPress}
                                />
                            </Item>
                            <Item floatingLabel>
                                <Label>My sexual orientation is</Label>
                                <Input
                                    style={{ color: 'purple'}}
                                    value={this.getSexualOrientationValue()}
                                    onFocus={this.handleShowSexualOrientationPickerBtnPress}
                                />
                            </Item>
                            <Item stackedLabel onPress={this.handleRacePrefsOnFocus}>
                                <Label>Looking for</Label>
                                {this.getRacePrefBadges()}
                            </Item>
                        </Form>
                    </Content>
                </Container>
                <ReactNativeButton rounded block style={this.getNextBtnStyle()} disabled={!this.getButtonDisabledValue()}>
                    <Text>Next</Text>
                </ReactNativeButton>
                {this.renderGenderPicker()}
                {this.renderSexualOrientationPicker()}
                {this.renderRacePicker()}
            </TouchableOpacity>
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
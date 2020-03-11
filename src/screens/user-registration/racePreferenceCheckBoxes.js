import React, { Component } from 'react';
import { Button } from 'react-native';
import { Container, Header, Content, ListItem, CheckBox, Text, Body, Right, Left } from 'native-base';
import { setRacePrefIDs } from './actions';
import { connect } from 'react-redux';

class RacePreferencesCheckBoxes extends Component {
    state = {
        races: [],
        selectedRaceIDs: []
    };

    constructor(props) {
        super(props);
        const { selectedRaceIDs, races } = props.route.params;
        this.state.selectedRaceIDs = selectedRaceIDs;
        this.state.races = races;
        for (let i = 0, max = this.state.races.length; i < max; i++) {
            this.state.races[i].checked = selectedRaceIDs.indexOf(this.state.races[i].raceID) !== -1;
        }
    }

    handleCheckboxChanged = (index) => {
        const { races } = this.state;
        races[index].checked = !races[index].checked;
        this.setState({ races });
    }

    handleDoneBtnPressed = () => {
        const racePrefIDs = [];
        const { races } = this.state;
        races.forEach(race => {
            if (race.checked === true)
                racePrefIDs.push(race.raceID);
        });
        this.props.dispatch(setRacePrefIDs(racePrefIDs));
        this.props.navigation.goBack();
    }

    getCheckBoxes() {
        const { races } = this.state;
        if (races.length > 0) {
            return races.map((race, i) => {
                return (
                    <ListItem key={race.raceID} onPress={() => this.handleCheckboxChanged(i)}>
                        <CheckBox checked={race.checked} color='purple' />
                        <Body>
                            <Text>{race.label}</Text>
                        </Body>
                    </ListItem>
                );
            });
        }
        return null;
    }

    render() {
        const { navigation } = this.props;
        return (
            <Container>
                <Header>
                    <Left>
                        <Button title="Cancel" onPress={() => navigation.goBack()} />
                    </Left>
                    <Right>
                        <Button title="Done" onPress={this.handleDoneBtnPressed}/>
                    </Right>
                </Header>
                <Content>
                    {this.getCheckBoxes()}
                </Content>
            </Container>
        );
    }
}

export default connect()(RacePreferencesCheckBoxes);
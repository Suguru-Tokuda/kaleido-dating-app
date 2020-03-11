const userRegistrationData = {
    raceIDs: [],
    gender: '',
    racePrefIDs: [],
    genderToLookFor: ''
};

export default function UserRegistration(state = userRegistrationData, action) {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case 'SET_RACE_IDS':
            newState.raceIDs = action.value;
            break;
        case 'SET_GENDER':
            newState.gender = action.value;
            break;
        case 'SET_RACE_PREF_IDS':
            newState.racePrefIDs = action.value;
            break;
        case 'SET_GENDER_TO_LOOK_FOR':
            newState.genderToLookFor = action.value;
            break;
    }
    return newState;
}
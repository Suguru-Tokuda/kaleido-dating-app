const userRegistrationData = {
    raceIDs: [],
    gender: '',
    raceIDsToLookFor: [],
    genderToLookFor: ''
};

export default function UserRegistration(state = userRegistrationData, action) {
    const newState = Object.assign({}, state);
    return newState;
}
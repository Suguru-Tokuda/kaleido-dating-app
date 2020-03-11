const SET_RACE_IDS = 'SET_RACE_IDS';
const SET_GENDER = 'SET_GENDER';
const SET_RACE_PREF_IDS = 'SET_RACE_PREF_IDS';
const SET_GENDER_TO_LOOK_FOR = 'SET_GENDER_TO_LOOK_FOR';

export function setRaceIDs(raceIDs) {
    return { type: SET_RACE_IDS, value: raceIDs };
}

export function setGender(gender) {
    return { type: SET_GENDER, value: gender };
}

export function setRacePrefIDs(raceIDs) {
    return { type: SET_RACE_PREF_IDS, value: raceIDs };
}

export function setGenderToLookFor(gender) {
    return { type: SET_GENDER_TO_LOOK_FOR, value: gender };
}
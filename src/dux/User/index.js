export default function user(state={}, action) {
    switch (action.type) {
        case SET_FETCH_BEACH_URL:
            return {
                ...state,
                url: action.url
            }
        case USER_COORDINATES_SUCCESS:
            return {
                ...state,
                coordinates: action.coordinates
            }
        case USER_COORDINATES_FAILURE:
            return {
                ...state,
                failureToLocate: true,
                failureMessage: action.message
            }
        default:
            return state;
    }
}

export const USER_COORDINATES_SUCCESS = 'USER/USER_COORDINATES_SUCCESS';
export const USER_COORDINATES_FAILURE = 'USER/USER_COORDINATES_FAILURE';
export const SET_FETCH_BEACH_URL = 'USER/SET_FETCH_BEACH_URL';

const generateUrl = region => {
    const position = {
        south: region.latitude-2.5,
        west: region.longitude-2.5,
        north: region.latitude+2.5,
        east: region.longitude+2.5
    }
    const url = 'http://overpass-api.de/api/interpreter?data=' +
    '[out:json];(' +
    'node["name"~".* Beach$"]["place"="village"]' +
    `(${position.south},${position.west},${position.north},${position.east});` +
    'node["name"~".* Beach$"]["natural"="beach"]' +
    `(${position.south},${position.west},${position.north},${position.east});` +
    ');' +
    'out 3;'
    return encodeURI(url);
}

export function setFetchBeachUrl(url) {
    return {
        type: SET_FETCH_BEACH_URL,
        url
    }
}

export function userCoordinatesSuccess(coordinates) {
    return {
        type: USER_COORDINATES_SUCCESS,
        coordinates
    }
}

export function userCoordinatesFailure(message) {
    return {
        type: USER_COORDINATES_FAILURE,
        message
    }
}

export function getUserCoordinates() {
    return (dispatch, getState) => {
        return new Promise ((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const coordinates = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                    dispatch(userCoordinatesSuccess(coordinates))
                    dispatch(setFetchBeachUrl(generateUrl(coordinates)));
                    resolve({success: true})
                },
                (error) => {
                    dispatch(userCoordinatesFailure(error.message))
                    reject(new Error('error.message'))
                });
        })
    }
}

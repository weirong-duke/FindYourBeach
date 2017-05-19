export default function user(state={}, action) {
    switch (action.type) {
        case USER_COORDINATES_SUCCESS:
            console.log(' coordinates succs', action)
            return {
                ...state,
                coordinates: action.coordinates
            }
        case USER_COORDINATES_FAILURE:
            console.log('failure')
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

// export function getUserCoordinates()

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
    console.log('user coordinates')
    return (dispatch, getState) => {
        return new Promise ((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const coordinates = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                    dispatch(userCoordinatesSuccess(coordinates))
                    resolve({success: true})
                },
                (error) => {
                    console.log('error?', error)
                    dispatch(userCoordinatesFailure(error.message))
                    reject(new Error('error.message'))
                });
        })
    }
}

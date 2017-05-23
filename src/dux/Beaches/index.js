import {updateBeachQuery} from '../Querying';
import {_calculateWeatherScore, _determineWeatherApiCall, _generateBeachUrl} from './util';

const initialState = {
    byId: {},
    highScore: false
};

export default function beaches(state = initialState, action) {
    switch (action.type) {
        case FETCH_BEACHES_FOR_USER_SUCCESS:
            return {
                ...state,
                beaches: action.beaches
            }
        case SAVE_BEACH_BY_ID:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.id]: action.beach
                }
            }
        case SAVE_BEACH_SCORE_BY_ID:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.id]: {
                        ...state.byId[action.id],
                        score: action.score,
                        weather: action.weather
                    }
                }
            }
        case SET_NEW_HIGH_SCORE:
            return {
                ...state,
                highScore: {
                    id: action.id,
                    beach: action.beach
                }
            }
        default:
            return state;
    }
}

export const FETCH_BEACHES_FOR_USER_SUCCESS = 'BEACHES/FETCH_BEACHES_FOR_USER_SUCCESS';
export const FETCH_BEACHES_FOR_USER_FAILURE = 'BEACHES/FETCH_BEACHES_FOR_USER_FAILURE';

export const FETCH_WEATHER_FOR_BEACH_SUCCESS = 'BEACHES/FETCH_WEATHER_FOR_BEACH_SUCCESS';
export const FETCH_WEATHER_FOR_BEACH_FAILURE = 'BEACHES/FETCH_WEATHER_FOR_BEACH_FAILURE';

export const SAVE_BEACH_BY_ID = 'BEACHES/SAVE_BEACH_BY_ID';
export const SAVE_BEACH_SCORE_BY_ID = 'BEACHES/SAVE_BEACH_SCORE_BY_ID';

export const SET_NEW_HIGH_SCORE = 'BEACHES/SET_NEW_HIGH_SCORE';

export function fetchBeachesForUserSuccess(beaches) {
    return {type: FETCH_BEACHES_FOR_USER_SUCCESS, beaches}
}

export function fetchBeachesForUserFailure() {
    return {type: FETCH_BEACHES_FOR_USER_FAILURE}
}

export function saveBeachById(beach) {
    return {
        type: SAVE_BEACH_BY_ID,
        id: beach.id,
        beach
    }
}

export function saveBeachScoreById(id, score, weather) {
    return {
        type: SAVE_BEACH_SCORE_BY_ID,
        id,
        score,
        weather
    }
}

export function setNewHighScore(id, beach) {
    return {
        type: SET_NEW_HIGH_SCORE,
        id,
        beach: beach
    }
}

function _mapBeachToCoordinates(beach) {
    return {id: beach.id, latitude: beach.lat, longitude: beach.lon, name: beach.tags.name}
}

export function fetchBeaches(url) {
    return (dispatch, getState) => {
        dispatch(updateBeachQuery('Finding beaches near you...'));

        return fetch(url, {
            method: 'GET'
        })
        .then(response => {
            if (response.ok) {
                return response.json().then(json => {
                    json.elements.forEach(beach => {
                        dispatch(saveBeachById(beach));
                    })

                    const formattedBeaches = json.elements.map(_mapBeachToCoordinates)
                    dispatch(fetchBeachesForUserSuccess(formattedBeaches));

                    return formattedBeaches;
                })
            }
            else {
                return response.text().then(text => {
                    dispatch(updateBeachQuery(`An error occured: ${text}`))
                })
            }
        });
    }
}


export function fetchWeatherForBeach(beach) {
    return (dispatch, getState) => {
        dispatch(updateBeachQuery('Grabbing weather data for beaches...'))
        return fetch(_generateBeachUrl(beach), {method: "GET"}).then(response => {
            if (response.ok) {
                return response.json().then(json => {
                    const currentHighScore = getState().beaches.highScore;

                    const beachScore = _calculateWeatherScore(json)
                    dispatch(saveBeachScoreById(beach.id, beachScore, json));

                    if (!currentHighScore || (beachScore > currentHighScore.beach.score)) {
                        dispatch(setNewHighScore(beach.id, {...beach, score: beachScore, weather: json}));
                    }
                })
            }
            else {
                return response.text().then(text => {
                    dispatch(updateBeachQuery(`An error occured: ${text}`))
                })
            }
        })
    }

}

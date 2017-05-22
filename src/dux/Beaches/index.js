import {updateBeachQuery} from '../Querying';

const initialState = {
    byId: {},
    highScore: false
}

export default function beaches(state = initialState, action) {
    switch (action.type) {
        case FETCH_BEACHES_FOR_USER_SUCCESS:
            console.log('well heres the action', action);
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
    console.log('great success', beaches);
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


function __generateMockBeaches() {
    return [
        {
            id: 157557887,
            lat: -33.4901665,
            lon: 151.43163,
            tags: {
                'census:population': "870;2006",
                ele: "0",
                name: "South Topsail Beach",
                place: "village",
                population: "870"
            }
        },
        {
            id: 157557888,
            lat: 15.4901665,
            lon: 67.43163,
            tags: {
                'census:population': "870;2006",
                ele: "0",
                name: "East Topsail Beach",
                place: "village",
                population: "870"
            }
        },
        {
            id: 157557886,
            lat: 23.4901665,
            lon: 25.43163,
            tags: {
                'census:population': "870;2006",
                ele: "0",
                name: "North Topsail Beach",
                place: "village",
                population: "870"
            }
        }
    ]
}


function _mapBeachToCoordinates(beach) {
    return {id: beach.id, latitude: beach.lat, longitude: beach.lon, name: beach.tags.name}
}

export function fetchBeaches(url) {
    return (dispatch, getState) => {
        dispatch(updateBeachQuery('Finding beaches near you...'))
        // const mockBeaches = __generateMockBeaches().map(_mapBeachToCoordinates);
        // console.log('mocks', mockBeaches);
        // mockBeaches.forEach(beach => {
        //     console.log('dispatch save beach ', beach)
        //     dispatch(saveBeachById(beach));
        // });

        // dispatch(fetchBeachesForUserSuccess(mockBeaches));


        // return Promise.resolve(__generateMockBeaches());
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

                    console.log('state after fetch beaches', getState())

                    return formattedBeaches;
                })
            }
            else {
                return response.text().then(text => {
                    dispatch(updateBeachQuery(`An error occured: ${text}`))
                    console.log('error text', text);
                })
            }
        });
    }
}
function _generateBeachUrl(beach) {
    // determineWeatherApiCall();
    return `http://api.openweathermap.org/data/2.5/weather?lat=${beach.latitude}&lon=${beach.longitude}&appid=dfadc7ab2e248ddb1afddd6813ddefe9`
}

function _calculateWeatherScore(weather) {
    const weatherScores = {
        'Clouds': 50,
        'Clear': 100,
        'Rain': -25,
        'Drizzle': 0,
        'Snow': -50,
        'Thunderstorm': -50
    }
    if (!weather.clouds || !weather.clouds.all) {
        weather.clouds = {
            all: 50
        }
    }
    if (!weather.rain) {
        weather.rain = {
            '3h': 0
        }
    }

    return ((100 - weather.clouds.all) - (5 * (Math.abs(297 - weather.main.temp))) - (10 * weather.rain['3h']) + weatherScores[weather.weather[0].main]);
}
//
// _generateOptimalWeather(weatherObject) {
//     return {
//
//     }
// }

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
                    console.log('state after fetch promise', getState());

                })
            }
            else {
                return response.text().then(text => {
                    dispatch(updateBeachQuery(`An error occured: ${text}`))
                    console.log('error text', text);
                })
            }
        })
    }

}

function _determineWeatherApiCall() {
    const today = moment().format('dddd');
    return (today === 'Saturday' || today === 'Sunday')
        ? 'weather'
        : 'forecast';
}

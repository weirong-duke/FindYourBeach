
export function _determineWeatherApiCall() {
    const today = moment().format('dddd');
    return (today === 'Saturday' || today === 'Sunday')
        ? 'weather'
        : 'forecast';
}

export function _calculateWeatherScore(weather) {
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

export function _generateBeachUrl(beach) {
    return `http://api.openweathermap.org/data/2.5/weather?lat=${beach.latitude}&lon=${beach.longitude}&appid=dfadc7ab2e248ddb1afddd6813ddefe9`
}

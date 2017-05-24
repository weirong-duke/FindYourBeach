import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import * as Progress from 'react-native-progress';
import Hr from 'react-native-hr';
import moment from 'moment';

const getProgress = (status) => {
        const progressLevels = {
            'Finding beaches near you...': 0.10,
            'Grabbing weather data for beaches...': 0.70,
            'Calculating optimal beach...': 0.95
        }
        return progressLevels[status] || 0;
    }

const renderProgress = (status) => {
    return (
        <View>
            <Text style={styles.welcome}>
                {status}
            </Text>
            <Progress.Bar animated={false} progress={getProgress(status)} width={200} />

        </View>

    )
}

const _convertToFahrenheit = (temperature) => {
    return Math.round(temperature * 9 / 5 - 459.67);
}

const _getWeatherIcon = (weatherCondition) => {
    console.log(weatherCondition);
    const nightHours = [0,1,2,3,4,5,19,20,21,22,23];
    const icons = {
        day: {
            'Clouds': '02d.png',
            'Clear': '01d.png',
            'Rain': '09d.png',
            'Drizzle': '09d.png',
            'Snow': '13d.png',
            'Thunderstorm': '11d.png'
        },
        night: {
            'Clouds': '02n.png',
            'Clear': '01n.png',
            'Rain': '09d.png',
            'Drizzle': '09d.png',
            'Snow': '13d.png',
            'Thunderstorm': '11d.png'
        }
    }
    console.log(moment().hour())
    console.log(nightHours.includes(moment().hour()))
    if (nightHours.includes(moment().hour())) {
        console.log(`http://openweathermap.org/img/w/${icons.night[weatherCondition]}`)
        return `http://openweathermap.org/img/w/${icons.night[weatherCondition]}`
    }
    else {
        console.log(`http://openweathermap.org/img/w/${icons.day[weatherCondition]}`)
        return `http://openweathermap.org/img/w/${icons.day[weatherCondition]}`
    }
}

const renderResults = (beach) => {
    const iconUrl = _getWeatherIcon(beach.weather.weather[0].main)
    return (
            <Image source={require('../../data/resultsBackground.png')} style={styles.background}>

                                <Text style={styles.beachTitle}>
                                    {beach.name}
                                </Text>
                                <Text style={styles.beachDataLarge}>
                                    Score: {beach.score}
                                </Text>
                                <Text style={styles.beachDataLarge}>
                                    {_convertToFahrenheit(beach.weather.main.temp)}° F
                                </Text>
                                <Text style={styles.beachDataLarge}>
                                    {beach.weather.weather[0].main}
                                    <Image style={{height:50, width:50}} source={{uri: iconUrl}} />

                                </Text>

                                <Hr lineColor='#fff'/>
                                <Text style={styles.beachDataMedium}>
                                    Wind: {beach.weather.wind.speed} mph
                                </Text>

            </Image>


    )
    }

export default class Searching extends React.Component{
    shouldComponentUpdate(nextProps) {
        return this.props.querying.status !== nextProps.querying.status
    }

    render() {
        // {(this.props.querying.status === 'Done') ? renderResults(this.props.beaches.highScore.beach) : renderProgress(this.props.querying.status)}

        return renderResults(this.props.beaches.highScore.beach || {name: "Your mom's beach", score: 50, weather: {weather:[{main:'Clouds'}], main: {temp: 285}, wind:{speed:23}}})

    }
}


const styles = StyleSheet.create({
    background: {
            flex: 1,
            alignSelf: 'stretch',
            width: null,
    },
    beachTitle: {
        color: 'white',
        fontSize: 36,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 0
    },
    beachDataLarge: {
        color: 'white',
        fontSize: 30,
        marginTop: 0,
        marginLeft: 10,
        marginRight: 10
    },
    beachDataMedium: {
        fontSize: 24,
        marginLeft: 10,
        marginRight: 10,
        color: 'white'
    }
});

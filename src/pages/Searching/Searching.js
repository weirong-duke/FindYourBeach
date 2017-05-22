import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as Progress from 'react-native-progress';

const getProgress = (status) => {
        const progressLevels = {
            'Finding beaches near you...': 0.10,
            'Grabbing weather data for beaches...': 0.70,
            'Calculating optimal beach...': 0.95
        }
        console.log('checking status', status, progressLevels[status])
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

const renderResults = (beach) => {
        return (
            <View>
                <Text style={styles.beachTitle}>
                    {beach.name}
                </Text>
                <Text style={styles.beachData}>
                    Beach Score: {beach.score}
                </Text>
                <Text style={styles.beachData}>
                    {beach.weather.weather[0].main}
                </Text>
                <Text style={styles.beachData}>
                    Temperature: {beach.weather.main.temp}
                </Text>
                <Text style={styles.beachData}>
                    Wind: {beach.weather.wind.speed} mph
                </Text>

            </View>

        )
    }

export default class Searching extends React.Component{
    shouldComponentUpdate(nextProps) {
        return this.props.querying.status !== nextProps.querying.status
    }

    render() {
        console.log('hello', this.props);
        return (
            <View>
                {(this.props.querying.status === 'Done') ? renderResults(this.props.beaches.highScore.beach) : renderProgress(this.props.querying.status)}
            </View>

        )

    }
}


const styles = StyleSheet.create({
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    beachTitle: {
        fontSize: 36,
        margin: 10
    },
    beachData: {
        fontSize: 24,
        margin: 10
    }
});

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Image} from 'react-native';
import { Link } from 'react-router-native';
import moment from 'moment';

class Main extends React.Component{
    componentDidMount() {
        this.props.beginBeachQuery();
        this.props.getUserCoordinates()
            .then(response => {
                if (response.success) {
                    return this.props.fetchBeaches(this.props.user.url);
                }
            })
            .then(queryResponse => {
                const weatherPromises = [];

                queryResponse.forEach(beach => {
                    weatherPromises.push(this.props.fetchWeatherForBeach(beach))
                })
                Promise.all(weatherPromises)
                    .then(() => {
                        this.props.updateBeachQuery('Calculating optimal beach...');
                        this.props.finishBeachQuery();
                    })
            })

    }

    render() {
        return (
            <Image source={require('../../data/background.png')} style={styles.background}>
                <Link to="/searching" style={styles.sunButton} >
                    <Image source={require('../../data/sunButton.png')} style={styles.sunButton} />
                </Link>

            </Image>

        )
    }
}

export default Main;


const styles = StyleSheet.create({
    welcome: {
        margin: 10
    },
    background: {
        flex: 1,
        alignSelf: 'stretch',
        width: null,
    },
    sunButton: {
        width:null,
        flex: 1
    }
});

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native'
import moment from 'moment';
import { Link } from 'react-router-native'


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
                console.log('success! GOT THE SHIT', queryResponse)
                const weatherPromises = [];

                queryResponse.forEach(beach => {
                    weatherPromises.push(this.props.fetchWeatherForBeach(beach))
                })
                Promise.all(weatherPromises)
                    .then(() => {
                        this.props.updateBeachQuery('Calculating optimal beach...');

                        console.log('finished')
                        this.props.finishBeachQuery();
                    })
            })

    }

    beginQuery() {

    }
    // <Button title="Find me a beach" color="#841584" onPress={() => this.beginQuery()}/>

    render() {
        return (
            <View>
                <Link to="/searching" style={styles.welcome} underlayColor="#841584">
                    <Text>Find me a beach</Text>
                </Link>
            </View>
        )
    }
}

export default Main;


const styles = StyleSheet.create({
    welcome: {
        margin: 10
    }
});

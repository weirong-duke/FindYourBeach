import React from 'react';
import {AppRegistry, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native'

class Main extends React.Component{
    componentWillMount() {
        console.log('pls')
        navigator.geolocation.getCurrentPosition((position) => {
            console.log('position', position);
            let region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.00922*1.5,
                longitudeDelta: 0.00421*1.5
            }

            // this.onRegionChange(region, position.coords.accuracy);
        });
    }
    render() {
        console.log('yas')
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}></Text>
                <Button title="Find me a beach" color="#841584"/>
            </View>
        )
    }
}

export default Main;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});

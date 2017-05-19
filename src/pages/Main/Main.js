import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native'

const generateUrl = position => {
    const url = 'http://overpass-api.de/api/interpreter?data=' +
    '[out:json];(' +
    'node["name"~".* Beach$"]["place"="village"]' +
    `(${position.south},${position.west},${position.north},${position.east});` +
    'node["name"~".* Beach$"]["natural"="beach"]' +
    `(${position.south},${position.west},${position.north},${position.east});` +
    ');' +
    'out 20;'
    console.log('loggin url')
    console.log(url)
    console.log(encodeURI(url))
    return encodeURI(url);
}


class Main extends React.Component{
    componentDidMount() {
        console.log('props', this.props);
        this.props.getUserCoordinates().then(blurp => console.log('response', blurp));

    }
    componentWillMount() {
        // console.log('pls')
        // navigator.geolocation.getCurrentPosition((position) => {
        //     // console.log(query)
        //     console.log('position', position);
        //     let region = {
        //         latitude: position.coords.latitude,
        //         longitude: position.coords.longitude
        //     }
        //
        //     const searchSquare = {
        //         south: region.latitude-2.5,
        //         west: region.longitude-2.5,
        //         north: region.latitude+2.5,
        //         east: region.longitude+2.5
        //     }
        //
        //     console.log(`(${region.latitude-2.5}, ${region.longitude-2.5}, ${region.latitude+2.5}, ${region.longitude+2.5})`)
        //     console.log('search square')
        //     console.log(searchSquare);
        //     console.log('running query');
            // fetch(generateUrl(searchSquare), {
            //     method: 'GET'
            // })
            // .then(response => {
            //     console.log('fetch response')
            //     console.log(response);
            //     response.json().then(json => {
            //         console.log('json')
            //         console.log(json);
            //     }
            //     )
            // })


            // this.onRegionChange(region, position.coords.accuracy);
        // });
    }

    render() {
        console.log('yas')
        console.log(this.props);
        return (
            <View>
                <Text style={styles.welcome}>gzdfgdghxthxfgh</Text>
                <Button title="Find me a beach" color="#841584" onPress={()=> console.log('hallo')}/>
            </View>
        )
    }
}

export default Main;


const styles = StyleSheet.create({
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    }
});

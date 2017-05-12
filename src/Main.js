import React from 'react';
import {AppRegistry, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native'

class Main extends React.Component{
    render() {
        return (
            <View style={{flex:1}}>
                <Text styles={styles.welcome}></Text>
                <Button title="Find me a beach" color="#841584" accessibilityLabel="Learn more about this purple button"/>
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

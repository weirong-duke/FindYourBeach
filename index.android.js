/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import Main from './src/Main';
import {AppRegistry, StyleSheet, Text, View} from 'react-native';

export default class FindYourBeach extends Component {
    render() {
        return (
                <Main />
        );
    }
}

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

AppRegistry.registerComponent('FindYourBeach', () => FindYourBeach);

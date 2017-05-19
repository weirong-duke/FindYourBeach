/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import App from './src/App';
import {AppRegistry, StyleSheet, Text, View} from 'react-native';


export default class FindYourBeach extends Component {
    render() {
        return (
                <App />
        );
    }
}

AppRegistry.registerComponent('FindYourBeach', () => FindYourBeach);

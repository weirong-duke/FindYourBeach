import React from 'react';
import {StyleSheet, AppRegistry, View} from 'react-native';

import { NativeRouter, Route} from 'react-router-native'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import combinedReducers from './dux';

let store=createStore(
    combinedReducers,
    applyMiddleware(thunk)
);

import Main from './pages/Main';
import Searching from './pages/Searching';

class App extends React.Component{
    render() {
        return (
            <Provider store={store}>
                <NativeRouter>
                    <View style={styles.container}>
                        <Route exact path='/' component={Main} />
                        <Route exact path='/searching' component={Searching} />
                    </View>
                </NativeRouter>
            </Provider>
        )
    }
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    }
});

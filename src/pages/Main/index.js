import Main from './Main';
import { connect } from 'react-redux'
import {getUserCoordinates} from '../../dux/User';
import {fetchBeaches, fetchWeatherForBeach} from '../../dux/Beaches';
import {beginBeachQuery, finishBeachQuery, updateBeachQuery} from '../../dux/Querying';

const mapStateToProps = (state) => {
    return {
        user: state.user,
        beaches: state.beaches
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserCoordinates: () => dispatch(getUserCoordinates()),
        fetchBeaches: (url) => dispatch(fetchBeaches(url)),
        fetchWeatherForBeach: (beach) => dispatch(fetchWeatherForBeach(beach)),
        beginBeachQuery: () => dispatch(beginBeachQuery()),
        updateBeachQuery: updateString => dispatch(updateBeachQuery(updateString)),
        finishBeachQuery: () => dispatch(finishBeachQuery())
    }
}

const Connected = connect(mapStateToProps, mapDispatchToProps)(Main)

export default Connected;

import Main from './Main';
import { connect } from 'react-redux'
import {getUserCoordinates} from '../../dux/User';

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserCoordinates: () => {
            console.log('gett')
            return dispatch(getUserCoordinates())
        }
    }
}

const Connected = connect(mapStateToProps, mapDispatchToProps)(Main)

export default Connected;

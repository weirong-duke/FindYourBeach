import Searching from './Searching';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        querying: state.querying,
        beaches: state.beaches
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

const Connected = connect(mapStateToProps, mapDispatchToProps)(Searching)

export default Connected;

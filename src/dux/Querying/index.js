const defaultState = {
    finished: true
}

export default function querying(state = defaultState, action) {
    switch(action.type) {
        case BEGIN_BEACH_QUERY:
            return {
                ...state,
                finished: false,
            }
        case FINISH_BEACH_QUERY:
            return {
                ...state,
                finished: true,
                status: 'Done'
            }
        case UPDATE_BEACH_QUERY:
            return {
                ...state,
                status: action.status
            }
        default:
            return state;
    }

}

export const BEGIN_BEACH_QUERY = 'QUERYING/BEGIN_BEACH_QUERY';
export const FINISH_BEACH_QUERY = 'QUERYING/FINISH_BEACH_QUERY';
export const UPDATE_BEACH_QUERY = 'QUERYING/UPDATE_BEACH_QUERY';

export function beginBeachQuery() {
    return {
        type: BEGIN_BEACH_QUERY
    }
}

export function finishBeachQuery() {
    return {
        type: FINISH_BEACH_QUERY
    }
}

export function updateBeachQuery(status) {
    return {
        type: UPDATE_BEACH_QUERY,
        status
    }
}

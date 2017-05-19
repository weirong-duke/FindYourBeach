export default function querying(state = false, action) {
    switch(action.type) {
        case BEGIN_BEACH_QUERY:
            return {
                state: true
            }
        case FINISH_BEACH_QUERY:
            return {
                state: false
            }
        default:
            return state;        
    }

}

export const BEGIN_BEACH_QUERY = 'QUERYING/BEGIN_BEACH_QUERY';
export const FINISH_BEACH_QUERY = 'QUERYING/FINISH_BEACH_QUERY';
